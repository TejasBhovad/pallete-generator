"use client";

import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

export default function ColorPicker({ setShades }) {
  const [color, setColor] = useState("#000000");
  useEffect(() => {
    invoke("get_shades", { color: color })
      .then((result) => setShades(result))
      .catch(console.error);
  }, [color]);

  return (
    <div className="h-24 flex items-center justify-center rounded-sm bg-gray-00 p-2">
      <input
        className="w-full h-full rounded-sm bg-transparent"
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <span className="absolute" style={{ pointerEvents: "none" }}>
        {color}
      </span>
    </div>
  );
}
