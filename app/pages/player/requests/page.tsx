"use client";

import React, { useState } from "react";
import { MessageItem } from "@/app/components/player/request/message-item";
import { MessageDetail } from "@/app/components/player/request/message-detail";

const MOCK_MESSAGES = [
  {
    id: 1,
    fecha_partido: "19/04/206",
    estado: "pending",
    tipo: "Trabajo",
    motivo:
      "Estimados compañeros de Soporte,\n\nHemos recibido su solicitud de información para la Primera de nombres de la Liga BBVA. Necesitamos que se validen los siguientes datos antes del próximo partido:\n\n- Lista completa de jugadores con ID validada\n- Historial de sanciones actualizado\n- Confirmación de equipaciones",
    avatar: "L",
  },
  {
    id: 2,
    fecha_partido: "23/03/206",
    estado: "acepted",
    tipo: "Ocupado",
    motivo:
      "Contenido detallado sobre los planes de nombre para la temporada actual del Club Atlas.",
    avatar: "A",
  },
  {
    id: 3,
    fecha_partido: "32/03/206",
    estado: "rechejed",
    tipo: "Trabajo",
    motivo:
      "Hola, no puedo subir archivos PDF al sistema. Me sale un error 403 al intentar adjuntar el documento.",
    avatar: "U",
  },
  {
    id: 4,
    fecha_partido: "01/04/206",
    estado: "pending",
    tipo: "Medico",
    motivo:
      "Quisiera saber el estado de mi última factura y si el pago fue procesado correctamente por el banco.",
    avatar: "U",
  },
  {
    id: 5,
    fecha_partido: "05/04/206",
    estado: "acepted",
    tipo: "Ocupado",
    motivo:
      "Aviso: Este fin de semana habrá mantenimiento programado desde las 02:00 AM hasta las 05:00 AM.",
    avatar: "S",
  },
];

export default function PlayerRequestsPage() {
  const [selectedId, setSelectedId] = useState(MOCK_MESSAGES[0].id);

  const selectedMessage = MOCK_MESSAGES.find((m) => m.id === selectedId);

  return (
    <div className="flex h-full w-full bg-[#0a0a0a] overflow-hidden rounded-lg border border-gray-800">
      <div className="w-80 border-r border-gray-800 flex flex-col bg-[#0f0f0f]">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white">Solicitudes</h3>
          <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold py-1 px-3 rounded uppercase tracking-wider">
            + Redactar
          </button>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {MOCK_MESSAGES.map((msg) => (
            <MessageItem
              key={msg.id}
              msg={msg}
              active={selectedId === msg.id}
              onClick={() => setSelectedId(msg.id)}
            />
          ))}
        </div>
      </div>

      <MessageDetail msg={selectedMessage} />
    </div>
  );
}
