'use client';

import { useEffect } from 'react';

export default function LivePage() {
  useEffect(() => {
    import('hls.js').then((Hls) => {
      const video = document.getElementById('video') as HTMLVideoElement;
      if (Hls.default.isSupported()) {
        const hls = new Hls.default();
        hls.loadSource('http://YOUR_SERVER_IP:8888/live/main/index.m3u8');
        hls.attachMedia(video);
      }
    });
  }, []);

  return (
    <main style={{padding:20}}>
      <h1>🔴 LIVE STREAM</h1>
      <video id="video" controls autoPlay style={{width:'100%'}} />
      <div style={{marginTop:20}}>AdSense placeholder</div>
    </main>
  );
}
