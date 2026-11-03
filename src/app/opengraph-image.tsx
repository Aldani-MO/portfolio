import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Mohamed Aldani: Software Engineer. The Line, selected work in web, transit and security.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const font = await readFile(join(process.cwd(), "public/fonts/brand-bold.ttf"));
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f4ee", color: "#161813", padding: "64px", fontFamily: "Bricolage", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 25 }}><span>MA / 01</span><span>KUWAIT · AMMAN</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 105, lineHeight: 0.95, letterSpacing: -5 }}><span>MOHAMED</span><span>ALDANI</span></div>
      <div style={{ display: "flex", borderTop: "3px solid #885100", paddingTop: 24, justifyContent: "space-between", fontSize: 28 }}><span>Software Engineer</span><span>Web / Transit / Security</span></div>
    </div>,
    { ...size, fonts: [{ name: "Bricolage", data: font, style: "normal", weight: 700 }] }
  );
}
