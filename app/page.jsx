"use client";
import React from "react";
import ColorPicker from "@/app/components/ColorPicker";
import { useToast } from "@/components/ui/use-toast";

import { useState } from "react";

const page = () => {
  const [shades, setShades] = useState([]);
  const { toast } = useToast();
  const copyToClipboard = (color) => {
    toast({
      title: `${color}`,
      description: "Copied to clipboard!",
    });
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full px-8 py-2 bg-gray-900 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-white">
          Color Picker
        </h1>
        <ColorPicker setShades={setShades} className="h-1/4 " />
        <div className="overflow-y-auto h-3/4 w-full bg-gray-800 p-4">
          {shades
            .filter((shade) => shade !== "#000000" && shade !== "#FFFFFF")
            .map((shade) => (
              <div
                key={shade}
                style={{ backgroundColor: shade }}
                className="h-24 flex items-center justify-center"
                onClick={() => copyToClipboard(shade)}
              >
                <span>{shade}</span>
              </div>
            ))}
          {/* button o show toast */}
        </div>
      </div>
    </div>
  );
};

export default page;
