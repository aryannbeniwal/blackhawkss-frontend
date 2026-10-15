import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

export const alt = "Black Hawk Security Solution — Security Built on Discipline. Service Driven by Trust.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/black-hawk-logo-512.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #0b0b0c 0%, #161618 60%, #2a0d0d 100%)",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
          padding: 64,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#f5b400", fontWeight: 700 }}>Haryana & Delhi NCR</div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, marginTop: 24, textTransform: "uppercase" }}>
            Security Built on Discipline.
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1, marginTop: 8, textTransform: "uppercase", color: "#f5b400" }}>
            Service Driven by Trust.
          </div>
          <div style={{ fontSize: 26, marginTop: 28, color: "#a1a1aa" }}>{site.name} · Guards · Bouncers · PSOs · Supervisors · Manpower</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="" width={300} height={357} style={{ width: 300, height: 357 }} />
      </div>
    ),
    { ...size },
  );
}
