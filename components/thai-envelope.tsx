"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ThaiEnvelope() {
  const [isOpen, setIsOpen] = useState(false)
  const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 })
  const [isDraggingCard, setIsDraggingCard] = useState(false)
  const [isDraggingEnvelope, setIsDraggingEnvelope] = useState(false)

  const handleEnvelopeClick = () => {
    if (!isDraggingEnvelope) {
      if (isOpen) {
        setCardPosition({ x: 0, y: 0 })
      }
      setIsOpen(!isOpen)
    }
  }

  return (
    <motion.div
      className="relative w-full max-w-md aspect-[3/4] cursor-pointer"
      onClick={handleEnvelopeClick}
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => setIsDraggingEnvelope(true)}
      onDragEnd={() => {
        // Reset after a short delay to allow click event to check the flag
        setTimeout(() => setIsDraggingEnvelope(false), 50)
      }}
    >
      {/* Envelope Body */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative w-[320px] h-[440px]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Bottom part of envelope */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37] to-[#C5A028] rounded-lg shadow-2xl overflow-hidden">
            {/* Decorative pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                }}
              />
            </div>

            {/* Border decoration */}
            <div className="absolute inset-4 border-2 border-[#F4E4C1] opacity-40 rounded" />
          </div>

          {/* Blessing Card */}
<AnimatePresence>
            {isOpen && (
              <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                onDragStart={(e) => {
                  e.stopPropagation()
                  setIsDraggingCard(true)
                }}
                onDragEnd={(e) => {
                  e.stopPropagation()
                  setTimeout(() => setIsDraggingCard(false), 50)
                }}
                onDrag={(e, info) => {
                  e.stopPropagation()
                  setCardPosition({ x: info.offset.x, y: info.offset.y })
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
                className="absolute inset-x-8 top-12 z-20 cursor-grab active:cursor-grabbing"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-gradient-to-br from-pink-100 via-pink-50 to-white rounded-2xl shadow-2xl p-8 border-2 border-pink-200 overflow-hidden">
                  {/* Polka dot side borders */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-pink-300 opacity-40">
                    <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-white" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-pink-300 opacity-40">
                    <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-full bg-white" />
                      ))}
                    </div>
                  </div>

                  {/* Cloud decorations - top left */}
                  <div className="absolute top-4 left-8">
                    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" className="opacity-60">
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
                    <svg width="35" height="25" viewBox="0 0 35 25" fill="none" className="opacity-60">
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
                      <svg key={i} width="20" height="24" viewBox="0 0 20 24" fill="none" className="opacity-50">
                        <path d="M2 2L10 2L10 18L6 14L2 18L2 2Z" fill="#FFB6C1" stroke="#FF69B4" strokeWidth="1" />
                      </svg>
                    ))}
                  </div>

                  {/* Flower decorations - bottom corners */}
                  <div className="absolute bottom-3 left-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-50">
                      <circle cx="12" cy="12" r="3" fill="#FFB6C1" />
                      <circle cx="12" cy="7" r="3" fill="#FFC0CB" />
                      <circle cx="17" cy="12" r="3" fill="#FFC0CB" />
                      <circle cx="12" cy="17" r="3" fill="#FFC0CB" />
                      <circle cx="7" cy="12" r="3" fill="#FFC0CB" />
                      <circle cx="12" cy="12" r="2" fill="#FFD700" />
                    </svg>
                  </div>

                  <div className="absolute bottom-3 right-10">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="opacity-50">
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
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-40">
                      <path d="M8 14L2 8C0 6 0 3 2 2C4 1 6 2 8 4C10 2 12 1 14 2C16 3 16 6 14 8L8 14Z" fill="#FF69B4" />
                    </svg>
                  </div>

                  <div className="absolute top-16 right-7">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-40">
                      <path
                        d="M7 12L2 7C0.5 5.5 0.5 3 2 2C3.5 1 5 2 7 3.5C9 2 10.5 1 12 2C13.5 3 13.5 5.5 12 7L7 12Z"
                        fill="#FFB6C1"
                      />
                    </svg>
                  </div>

                  {/* Content area with better spacing */}
                  <div className="space-y-4">
                    {/* <h2 className="text-2xl font-semibold text-center text-[#8B4513] font-thai">คำอวยพรแด่คุณ</h2> */}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                    <p className="text-sm leading-relaxed text-[#5C4033] font-thai text-center">
                      สุขสันต์วันเกิดจ้ะ ขอให้มายโชคดี
                      <br />
                      มีความสุข ร่าเริงแจ่มใส เรียนเก่ง
                      <br />
                      และเป็นที่รักของทุกคนเช่นนี้ตลอดไปจ้ะ
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Top Flap */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{
              duration: 0.6,
              delay: isOpen ? 0 : 0.8,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
            className="absolute top-0 left-0 right-0 z-10"
          >
            <div
              className="relative w-full h-[220px]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#C5A028] to-[#D4AF37] shadow-xl">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                    }}
                  />
                </div>

                {/* Thai-inspired decorative element in center */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2">
                  <div className="w-16 h-16 rounded-full border-2 border-[#F4E4C1] opacity-40 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-[#F4E4C1] opacity-30" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instruction text (only visible when closed) */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-6 left-0 right-0 text-center"
            >
              <p className="text-[#8B4513] text-sm font-thai opacity-70">คลิกเพื่อเปิด</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
