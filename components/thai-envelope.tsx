"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type EnvelopeType = "fathersday" | "birthday";

export function ThaiEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
  const [isDraggingCard, setIsDraggingCard] = useState(false);
  const [isDraggingEnvelope, setIsDraggingEnvelope] = useState(false);
  const [envelopeType, setEnvelopeType] = useState<EnvelopeType>("fathersday");

  const handleEnvelopeClick = () => {
    if (!isDraggingEnvelope) {
      if (isOpen) {
        setCardPosition({ x: 0, y: 0 });
      }
      setIsOpen(!isOpen);
    }
  };

  const handleTypeSwitch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setCardPosition({ x: 0, y: 0 });
    setEnvelopeType((prev) =>
      prev === "fathersday" ? "birthday" : "fathersday"
    );
  };

  const envelopeColors =
    envelopeType === "fathersday"
      ? {
          body: "#D4AF37",
          flap: "#C5A028",
          border: "#F4E4C1",
          accent: "#B8941E",
        }
      : {
          body: "#FFB6D9",
          flap: "#FF85C1",
          border: "#FFE4E1",
          accent: "#FF69B4",
        };

  return (
    <div className="relative w-full flex flex-col items-center gap-6">
      <button
        onClick={handleTypeSwitch}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 font-semibold text-sm"
      >
        Switch
      </button>

      <motion.div
        className="relative w-full max-w-md aspect-[3/4] cursor-pointer"
        onClick={handleEnvelopeClick}
        drag
        dragMomentum={false}
        dragElastic={0.1}
        onDragStart={() => setIsDraggingEnvelope(true)}
        onDragEnd={() => {
          setTimeout(() => setIsDraggingEnvelope(false), 50);
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-[400px] h-[280px]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Envelope Body - Rectangular like email icon */}
            <div
              className="absolute inset-0 rounded-lg shadow-2xl border-4 border-black"
              style={{
                backgroundColor: envelopeColors.body,
              }}
            >
              {/* Side shading for depth */}
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-black opacity-10" />
              <div className="absolute left-0 bottom-0 right-0 h-8 bg-black opacity-10" />
            </div>

            {/* Blessing Card */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  drag
                  dragMomentum={false}
                  dragElastic={0.1}
                  onDragStart={(e) => {
                    e.stopPropagation();
                    setIsDraggingCard(true);
                  }}
                  onDragEnd={(e) => {
                    e.stopPropagation();
                    setTimeout(() => setIsDraggingCard(false), 50);
                  }}
                  onDrag={(e, info) => {
                    e.stopPropagation();
                    setCardPosition({ x: info.offset.x, y: info.offset.y });
                  }}
                  initial={{ y: 0, opacity: 1, x: 0 }}
                  animate={{
                    y: -180 + cardPosition.y,
                    x: cardPosition.x,
                    opacity: 1,
                  }}
                  exit={{
                    y: 0,
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: isOpen ? 0.6 : 0,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing w-[385px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {envelopeType === "birthday" ? (
                    // Birthday Card (current pink design)
                    <div className="relative bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl shadow-2xl p-8 border-2 border-pink-200 overflow-hidden">
                      {/* Polka dot side borders */}
                      <div className="absolute left-0 top-0 bottom-0 w-6 bg-pink-300 opacity-40">
                        <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full bg-white"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-6 bg-pink-300 opacity-40">
                        <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-3 h-3 rounded-full bg-white"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Cloud decorations - top left */}
                      <div className="absolute top-4 left-8">
                        <svg
                          width="40"
                          height="28"
                          viewBox="0 0 40 28"
                          fill="none"
                          className="opacity-60"
                        >
                          <path
                            d="M10 18C10 18 8 18 8 16C8 14 10 14 10 14C10 14 10 11 13 11C16 11 16 14 16 14C16 14 19 14 19 17C19 20 16 20 16 20H10Z"
                            fill="white"
                            stroke="#FFC0CB"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      {/* Cloud decorations - top right */}
                      <div className="absolute top-6 right-8">
                        <svg
                          width="35"
                          height="25"
                          viewBox="00 0 35 25"
                          fill="none"
                          className="opacity-60"
                        >
                          <path
                            d="M8 16C8 16 6 16 6 14C6 12 8 12 8 12C8 12 8 9 11 9C14 9 14 12 14 12C14 12 17 12 17 15C17 18 14 18 14 18H8Z"
                            fill="white"
                            stroke="#FFC0CB"
                            strokeWidth="1.5"
                          />
                        </svg>
                      </div>

                      {/* Decorative bunting flags */}
                      <div className="absolute top-2 left-12 right-12 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            width="20"
                            height="24"
                            viewBox="0 0 20 24"
                            fill="none"
                            className="opacity-50"
                          >
                            <path
                              d="M2 2L10 2L10 18L6 14L2 18L2 2Z"
                              fill="#FFB6C1"
                              stroke="#FF69B4"
                              strokeWidth="1"
                            />
                          </svg>
                        ))}
                      </div>

                      {/* Flower decorations - bottom corners */}
                      <div className="absolute bottom-3 left-10">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="opacity-50"
                        >
                          <circle cx="12" cy="12" r="3" fill="#FFB6C1" />
                          <circle cx="12" cy="7" r="3" fill="#FFC0CB" />
                          <circle cx="17" cy="12" r="3" fill="#FFC0CB" />
                          <circle cx="12" cy="17" r="3" fill="#FFC0CB" />
                          <circle cx="7" cy="12" r="3" fill="#FFC0CB" />
                          <circle cx="12" cy="12" r="2" fill="#FFD700" />
                        </svg>
                      </div>

                      <div className="absolute bottom-3 right-10">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="opacity-50"
                        >
                          <circle cx="10" cy="10" r="2.5" fill="#FFB6C1" />
                          <circle cx="10" cy="6" r="2.5" fill="#FFC0CB" />
                          <circle cx="14" cy="10" r="2.5" fill="#FFC0CB" />
                          <circle cx="10" cy="14" r="2.5" fill="#FFC0CB" />
                          <circle cx="6" cy="10" r="2.5" fill="#FFC0CB" />
                          <circle cx="10" cy="10" r="1.5" fill="#FFD700" />
                        </svg>
                      </div>

                      {/* Small decorative hearts */}
                      <div className="absolute top-12 left-6">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="opacity-40"
                        >
                          <path
                            d="M8 14L2 8C0 6 0 3 2 2C4 1 6 2 8 4C10 2 12 1 14 2C16 3 16 6 14 8L8 14Z"
                            fill="#FF69B4"
                          />
                        </svg>
                      </div>

                      <div className="absolute top-16 right-7">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="opacity-40"
                        >
                          <path
                            d="M7 12L2 7C0.5 5.5 0.5 3 2 2C3.5 1 5 2 7 3.5C9 2 10.5 1 12 2C13.5 3 13.5 5.5 12 7L7 12Z"
                            fill="#FFB6C1"
                          />
                        </svg>
                      </div>

                      {/* Content area with better spacing */}
                      <div className="relative space-y-4 px-4">
                        {/* <h2 className="text-2xl font-semibold text-center text-pink-700 font-thai pt-4">
                          คำอวยพรแด่คุณ
                        </h2> */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-pink-200">
                          <p className="text-sm leading-relaxed text-pink-900 font-thai text-center">
                            สุขสันต์วันเกิดจ้ะ ขอให้เฟิร์นโชคดี
                            <br />
                            มีความสุข สุขภาพแข็งแรง
                            <br />
                            ร่าเริงแจ่มใส เรียนเก่ง
                            <br />
                            และเป็นที่รักของทุกคนเช่นนี้ตลอดไปจ้ะ
                          </p>
                          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent mx-auto rounded-full" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Father's Day Card (light yellow theme with flowers)
                    <div className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 rounded-2xl shadow-2xl p-8 border-2 border-yellow-300 overflow-hidden">
                      {/* Decorative borders with floral pattern */}
                      <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-b from-amber-200 to-yellow-300 opacity-50">
                        <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
                          {[...Array(6)].map((_, i) => (
                            <svg
                              key={i}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="opacity-70"
                            >
                              <circle cx="8" cy="8" r="2" fill="#FFA500" />
                              <circle cx="8" cy="4" r="2" fill="#FFD700" />
                              <circle cx="12" cy="8" r="2" fill="#FFD700" />
                              <circle cx="8" cy="12" r="2" fill="#FFD700" />
                              <circle cx="4" cy="8" r="2" fill="#FFD700" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-b from-amber-200 to-yellow-300 opacity-50">
                        <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
                          {[...Array(6)].map((_, i) => (
                            <svg
                              key={i}
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="opacity-70"
                            >
                              <circle cx="8" cy="8" r="2" fill="#FFA500" />
                              <circle cx="8" cy="4" r="2" fill="#FFD700" />
                              <circle cx="12" cy="8" r="2" fill="#FFD700" />
                              <circle cx="8" cy="12" r="2" fill="#FFD700" />
                              <circle cx="4" cy="8" r="2" fill="#FFD700" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      {/* Flower decorations - corners */}
                      <div className="absolute top-4 left-8">
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          className="opacity-60"
                        >
                          <circle cx="16" cy="16" r="4" fill="#FFA500" />
                          <circle cx="16" cy="8" r="4" fill="#FFD700" />
                          <circle cx="24" cy="16" r="4" fill="#FFD700" />
                          <circle cx="16" cy="24" r="4" fill="#FFD700" />
                          <circle cx="8" cy="16" r="4" fill="#FFD700" />
                          <circle cx="20" cy="12" r="3" fill="#FFEC8B" />
                          <circle cx="20" cy="20" r="3" fill="#FFEC8B" />
                          <circle cx="12" cy="20" r="3" fill="#FFEC8B" />
                          <circle cx="12" cy="12" r="3" fill="#FFEC8B" />
                          <circle cx="16" cy="16" r="3" fill="#FF8C00" />
                        </svg>
                      </div>

                      <div className="absolute top-4 right-8">
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 28 28"
                          fill="none"
                          className="opacity-60"
                        >
                          <circle cx="14" cy="14" r="3.5" fill="#FFA500" />
                          <circle cx="14" cy="7" r="3.5" fill="#FFD700" />
                          <circle cx="21" cy="14" r="3.5" fill="#FFD700" />
                          <circle cx="14" cy="21" r="3.5" fill="#FFD700" />
                          <circle cx="7" cy="14" r="3.5" fill="#FFD700" />
                          <circle cx="14" cy="14" r="2.5" fill="#FF8C00" />
                        </svg>
                      </div>

                      <div className="absolute bottom-4 left-8">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          className="opacity-60"
                        >
                          <circle cx="15" cy="15" r="4" fill="#FFA500" />
                          <circle cx="15" cy="8" r="4" fill="#FFD700" />
                          <circle cx="22" cy="15" r="4" fill="#FFD700" />
                          <circle cx="15" cy="22" r="4" fill="#FFD700" />
                          <circle cx="8" cy="15" r="4" fill="#FFD700" />
                          <circle cx="15" cy="15" r="3" fill="#FF8C00" />
                        </svg>
                      </div>

                      <div className="absolute bottom-4 right-8">
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          className="opacity-60"
                        >
                          <circle cx="13" cy="13" r="3.5" fill="#FFA500" />
                          <circle cx="13" cy="7" r="3.5" fill="#FFD700" />
                          <circle cx="19" cy="13" r="3.5" fill="#FFD700" />
                          <circle cx="13" cy="19" r="3.5" fill="#FFD700" />
                          <circle cx="7" cy="13" r="3.5" fill="#FFD700" />
                          <circle cx="13" cy="13" r="2.5" fill="#FF8C00" />
                        </svg>
                      </div>

                      {/* Decorative leaves */}
                      <div className="absolute top-12 left-6">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          className="opacity-40"
                        >
                          <path
                            d="M10 2C10 2 2 8 2 16C2 20 5 24 10 24C10 24 10 12 10 2Z"
                            fill="#90EE90"
                          />
                          <path
                            d="M10 2C10 2 18 8 18 16C18 20 15 24 10 24C10 24 10 12 10 2Z"
                            fill="#98FB98"
                          />
                        </svg>
                      </div>

                      <div className="absolute top-12 right-6">
                        <svg
                          width="20"
                          height="24"
                          viewBox="0 0 20 24"
                          fill="none"
                          className="opacity-40"
                        >
                          <path
                            d="M10 2C10 2 2 8 2 16C2 20 5 24 10 24C10 24 10 12 10 2Z"
                            fill="#90EE90"
                          />
                          <path
                            d="M10 2C10 2 18 8 18 16C18 20 15 24 10 24C10 24 10 12 10 2Z"
                            fill="#98FB98"
                          />
                        </svg>
                      </div>

                      {/* Content area */}
                      <div className="relative space-y-4 px-4">
                        {/* <h2 className="text-2xl font-semibold text-center text-amber-800 font-thai pt-4">สุขสันต์วันพ่อ</h2> */}
                        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-amber-300">
                          <p className="text-sm leading-relaxed text-amber-900 font-thai text-center">
                            เนื่องในโอกาสวันพ่อแห่งชาติ
                            <br />
                            ลูกขออาราธนาคุณพระศรีรัตนตรัย
                            <br />
                            และสิ่งศักดิ์สิทธิ์ทั้งหลายในสากลโลก
                            <br />
                            โปรดดลบันดาลให้คุณพ่อ
                            <br />
                            มีสุขภาพร่างกายที่แข็งแรง
                            <br />
                            อยู่เป็นร่มโพธิ์ร่มไทรให้ลูกหลานไปนาน ๆ
                            <br />
                            รักพ่อสุดหัวใจค่ะ
                          </p>
                          <p className="text-sm leading-relaxed text-amber-900 font-thai text-right">
                            จาก ลูกสาวสุดที่รัก
                          </p>
                          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full" />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Envelope Flap - Triangular top flap like email icon */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? -180 : 0 }}
              transition={{
                duration: 0.6,
                delay: isOpen ? 0 : 0.8,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              style={{
                transformOrigin: "top center", // Changed transform origin to top so flap rotates upward
                transformStyle: "preserve-3d",
              }}
              className="absolute top-0 left-0 right-0 z-10"
            >
              {/* Triangular flap shape */}
              <svg
                viewBox="0 0 400 140"
                className="w-full h-auto"
                style={{
                  filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                }}
              >
                {/* Main flap triangle */}
                <path
                  d="M 0,0 L 400,0 L 200,140 Z"
                  fill={envelopeColors.flap}
                  stroke="black"
                  strokeWidth="4"
                />
                {/* Curved bottom edge for envelope look */}
                <path
                  d="M 0,0 Q 100,30 200,30 T 400,0"
                  fill={envelopeColors.accent}
                  stroke="black"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                {/* Shadow/depth on sides */}
                <path
                  d="M 200,140 L 400,0 L 380,0 Z"
                  fill="black"
                  opacity="0.15"
                />
              </svg>
            </motion.div>

            {/* Diagonal lines from corners to center (mail icon characteristic) */}
            {!isOpen && (
              <>
                {/* Left diagonal line */}
                <div
                  className="absolute top-0 left-0 w-[200px] h-[140px] border-l-4 border-t-4 border-black pointer-events-none"
                  style={{
                    transformOrigin: "top left",
                    transform: "skewY(19.5deg)",
                    borderRight: "none",
                    borderBottom: "none",
                  }}
                />
                {/* Right diagonal line */}
                <div
                  className="absolute top-0 right-0 w-[200px] h-[140px] border-r-4 border-t-4 border-black pointer-events-none"
                  style={{
                    transformOrigin: "top right",
                    transform: "skewY(-19.5deg)",
                    borderLeft: "none",
                    borderBottom: "none",
                  }}
                />
                {/* Curved center bottom - mail icon signature look */}
                <svg
                  viewBox="0 0 400 140"
                  className="absolute top-0 left-0 w-full pointer-events-none"
                  style={{ height: "140px" }}
                >
                  <path
                    d="M 0,0 Q 100,40 200,40 T 400,0"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
