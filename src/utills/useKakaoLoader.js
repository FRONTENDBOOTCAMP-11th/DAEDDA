import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk";

export default function useKakaoLoader() {
  useKakaoLoaderOrigin({
    appkey: "86056c7737758b5f40ee46c60a71d82c",
    libraries: ["clusterer", "drawing", "services"],
  });
}
