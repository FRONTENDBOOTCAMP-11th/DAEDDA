import InputField from "@components/InputField";
import useKakaoLoader from "@pages/main/post/useKakaoLoader";
import PropTypes from "prop-types";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const defaultCenter = {
  lat: 33.450701,
  lng: 126.570667,
};

MainMap.propTypes = {
  selectLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectLocation: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default function MainMap({
  selectLocation,
  setSelectLocation,
  register,
  setValue,
}) {
  useKakaoLoader();

  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [address, setAddress] = useState("");

  // 선택한 위치의 주소를 가져오는 함수
  const fetchAddress = (lat, lng) => {
    if (!window.kakao) return;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.coord2Address(lng, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const roadAddr = result[0]?.road_address?.address_name;
        const parcelAddr = result[0]?.address?.address_name;
        const newAddress =
          roadAddr || parcelAddr || "주소 정보를 가져올 수 없습니다.";
        setAddress(newAddress);
        setValue("address", newAddress);
        setValue("location", [lat, lng]);
      }
    });
  };

  // 지도 클릭 시 실행되는 함수
  const handleMapClick = (_, mouseEvent) => {
    if (!map) return;
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    updateMap(lat, lng);
  };

  // 지도 및 마커 업데이트
  const updateMap = (lat, lng, addr = null) => {
    setSelectLocation([lat, lng]);
    if (addr) {
      setAddress(addr);
      setValue("address", addr);
    } else {
      fetchAddress(lat, lng);
    }

    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }

    const newMarker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lng),
    });

    newMarker.setMap(map);
    setMarker(newMarker);
    map.panTo(new kakao.maps.LatLng(lat, lng));
  };

  // 주소 검색 버튼 클릭 시 실행
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        if (!window.kakao) return;

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(data.address, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const lat = parseFloat(result[0].y);
            const lng = parseFloat(result[0].x);
            updateMap(lat, lng, data.address);
          }
        });
      },
    }).open();
  };

  // 주소 및 마커 초기화
  const clearMap = () => {
    setAddress("");
    setSelectLocation([defaultCenter.lat, defaultCenter.lng]);
    setValue("address", "");
    setValue("location", []);

    if (marker) {
      marker.setMap(null);
      setMarker(null);
    }
  };

  return (
    <>
      <Map
        id="map"
        center={{ lat: selectLocation[0], lng: selectLocation[1] }}
        style={{ width: "100%", height: "350px", marginBottom: "16px" }}
        level={4}
        onCreate={setMap}
        onClick={handleMapClick}
      >
        <MapMarker
          position={{ lat: selectLocation[0], lng: selectLocation[1] }}
        />
      </Map>

      <InputField
        labelName="상세 주소"
        type="text"
        placeholder="상세 주소"
        register={register("address", { required: "주소 입력은 필수입니다." })}
        defaultValue={address}
        readOnly
      />

      <div>
        <button onClick={handleAddressSearch} className="mb-4 mr-2">
          주소 검색
        </button>
        <button onClick={clearMap}>초기화</button>
      </div>
    </>
  );
}
