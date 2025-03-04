import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import InputField from "@components/InputField";
import Button from "@components/Button";
import PropTypes from "prop-types";

BasicMap.propTypes = {
  position: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  setPosition: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
};

export default function BasicMap({
  position,
  setPosition,
  address,
  setAddress,
}) {
  useKakaoLoader();
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [geocoder, setGeocoder] = useState(null);
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  useEffect(() => {
    if (window.kakao) {
      setGeocoder(new window.kakao.maps.services.Geocoder());
    }
  }, []);

  useEffect(() => {
    // position 변경 즉시 Map 업데이트
    document
      .getElementById("map")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [position]);

  const handleMapClick = (_, mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const newPosition = { lat: latlng.getLat(), lng: latlng.getLng() };
    setPosition(newPosition);

    if (geocoder) {
      geocoder.coord2Address(
        newPosition.lng,
        newPosition.lat,
        (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const roadAddress = result[0]?.road_address?.address_name;
            const jibunAddress = result[0]?.address?.address_name;
            const selectedAddress =
              roadAddress || jibunAddress || "주소 정보를 찾을 수 없습니다.";
            setAddress(selectedAddress);
            setValue("address", selectedAddress);
          }
        },
      );
    }
  };

  useEffect(() => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.addEventListener("touchend", handleMapClick);
    }
    return () => {
      if (mapElement) {
        mapElement.removeEventListener("touchend", handleMapClick);
      }
    };
  }, []);

  // `geocoder.addressSearch`를 Promise 기반으로 변환하여 더 빠르게 실행
  const searchAddressToCoords = address => {
    return new Promise((resolve, reject) => {
      if (!window.kakao) return reject("지도를 불러올 수 없습니다");
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve({ lat: Number(result[0].y), lng: Number(result[0].x) });
        } else {
          reject("주소를 찾을 수 없습니다.");
        }
      });
    });
  };

  const handleAddressSelect = async data => {
    try {
      const selectedAddress = data.address;
      setAddress(selectedAddress);
      setValue("address", selectedAddress);
      setIsPostcodeOpen(false);

      // 비동기적으로 좌표 변환 및 즉시 반영
      const newLatLng = await searchAddressToCoords(selectedAddress);
      setPosition(newLatLng);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Map
        id="map"
        center={position}
        className="w-full h-[350px] rounded-lg shadow-md"
        level={3}
        onClick={handleMapClick}
      >
        <MapMarker position={position} />
      </Map>

      <fieldset className="mt-11">
        <InputField
          labelName="주소 입력"
          type="text"
          placeholder="주소 입력"
          register={register("address", {
            required: "주소 입력은 필수입니다.",
          })}
          errorMsg={errors.address?.message}
          onClick={() => setIsPostcodeOpen(true)}
        />
      </fieldset>

      {isPostcodeOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <DaumPostcode onComplete={handleAddressSelect} />
          <div className="mt-8">
            <Button
              color="purple"
              height="lg"
              type="submit"
              onClick={() => setIsPostcodeOpen(false)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
