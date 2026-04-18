import React from "react";
import { BeatLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" >
      <BeatLoader  size={18} />
    </div>
  );
}