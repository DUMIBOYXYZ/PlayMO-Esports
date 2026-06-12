"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }
  }, [src]);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{
        background: "black",
        padding: "10px",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(255,0,0,0.4)"
      }}>
        <video
          ref={videoRef}
          controls
          autoPlay
          muted
          style={{
            width: "100%",
            borderRadius: "10px"
          }}
        />
      </div>
    </div>
  );
}