"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    // If browser supports HLS natively (Safari)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
    // For Chrome, Edge, Firefox
    else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    }

  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      muted
      style={{ width: "100%", borderRadius: "12px" }}
    />
  );
}