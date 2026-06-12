import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <main style={{ padding: "20px", textAlign: "center" }}>
      <h1>🏆 FIFA LIVE STREAM</h1><span style={{
  color: "red",
  fontWeight: "bold",
  marginLeft: "10px"
}}>
🔴 LIVE
</span>

      <VideoPlayer src="http://localhost:8080/hls/stream.m3u8" />
    </main>
  );
}