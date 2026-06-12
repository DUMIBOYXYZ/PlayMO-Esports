import { useEffect, useRef } from "react";
import Hls from "hls.js";

type Props = {
  src: string;
};

export default function VideoPlayer({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else {
      videoRef.current.src = src;
    }
  }, [src]);

  return <video ref={videoRef} controls />;
}