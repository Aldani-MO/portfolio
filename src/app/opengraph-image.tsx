import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mohamed Aldani, junior full-stack developer based in Kuwait. Selected work: Smart Dynamic Bus System, Phish Checker.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(join(process.cwd(), "public/fonts/brand-bold.ttf"));
  const teal = "#0b5c55";
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f3efe6", color: "#13191b", fontFamily: "Brand" }}>
      <div style={{ display: "flex", width: 96, justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, bottom: 0, width: 6, background: teal }} />
        <div style={{ position: "absolute", top: 300, width: 26, height: 46, borderRadius: 6, background: "#9a5600", border: "6px solid #f3efe6" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 72px 64px 40px" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#4a5456" }}>Full-stack developer · Kuwait</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 118, lineHeight: 0.92, letterSpacing: -5 }}>
          <span>MOHAMED</span><span>ALDANI</span>
        </div>
        <div style={{ display: "flex", gap: 20, fontSize: 28 }}>
          {["Flutter + Firebase", "Python + YOLOv8n", "PHP + CodeIgniter"].map(item => (
            <span key={item} style={{ display: "flex", padding: "10px 18px", background: teal, color: "#fbf9f4", borderRadius: 8 }}>{item}</span>
          ))}
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Brand", data: font, style: "normal", weight: 700 }] }
  );
}
