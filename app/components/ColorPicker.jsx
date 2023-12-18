"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function Greet() {
  const [greeting, setGreeting] = useState("");
  const [color, setColor] = useState("#000000");
  const [shades, setShades] = useState([]);

  useEffect(() => {
    invoke("greet", { name: "Next.js" })
      .then((result) => setGreeting(result))
      .catch(console.error);

    invoke("get_shades", { color: color })
      .then((result) => setShades(result))
      .catch(console.error);
  }, [color]);

  // Necessary because we will have to use Greet as a component later.
  return (
    <div>
      {greeting}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {color}
      {shades}
      {/* map throught array of colors */}
      {/* {shades.map((shade) => (
        <div
          key={shade}
          style={{ backgroundColor: shade, width: "100px", height: "100px" }}
        >
          {shade}
        </div>
      ))} */}
      {/* while mapping filter all colors with cakue #000000 */}
      {shades
        .filter((shade) => shade !== "#000000" && shade !== "#FFFFFF")
        .map((shade) => (
          <div
            key={shade}
            style={{ backgroundColor: shade, width: "100px", height: "100px" }}
          >
            {shade}
          </div>
        ))}
    </div>
  );
}
