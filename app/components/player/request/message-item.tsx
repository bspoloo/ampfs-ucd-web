"use client";

import React from "react";

export const MessageItem = ({ msg, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 p-4 cursor-pointer border-l-4 transition-all ${
      active
        ? "bg-[#252525] border-red-600"
        : "bg-transparent border-transparent hover:bg-white/5"
    }`}
  >
    <div className="w-10 h-10 min-w-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white border border-gray-600">
      {msg.avatar}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <h4
          className={`text-sm font-bold truncate ${active ? "text-white" : "text-gray-300"}`}
        >
          {msg.fecha_partido}
        </h4>
        <span className="text-[10px] text-gray-500 uppercase">
          {msg.estado}
        </span>
      </div>
      <p className="text-xs text-gray-400 font-semibold italic">{msg.tipo}</p>
    </div>
  </div>
);
