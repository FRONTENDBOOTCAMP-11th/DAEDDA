import { useEffect } from "react";
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "2bc73e6ae521141de21bd1459362d4d3",
    libraries: ["clusterer", "drawing", "services"],
  });

  useEffect(() => {
    if (!window.daum?.Postcode) {
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
}
