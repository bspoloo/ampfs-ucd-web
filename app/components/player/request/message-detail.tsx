"use client";

import React from "react";

export const MessageDetail = ({ msg } : any) => {
  if (!msg)
    return (
      <div className="flex-1 bg-[#121212] flex items-center justify-center text-gray-500">
        Selecciona una solicitud para ver el detalle
      </div>
    );

  return (
    <div className="flex-1 flex flex-col bg-[#121212] overflow-y-auto">
      <div className="p-8">
        <div className="flex justify-between items-start mb-8 border-b border-gray-800 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {msg.subject}
            </h2>
            <p className="text-sm text-gray-400">
              Tipo de solicitud: <span className="text-white">{msg.tipo}</span>
            </p>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500 block font-bold uppercase">
              {msg.estado}
            </span>
            <span className="text-xs text-gray-600">14 de Mayo, 2026</span>
          </div>
        </div>
        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
          {msg.motivo}
        </div>
      </div>
    </div>
  );
};
