import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "2bc73e6ae521141de21bd1459362d4d3",
    libraries: ["clusterer", "drawing", "services"],
  });
}
