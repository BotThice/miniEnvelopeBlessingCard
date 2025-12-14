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
                <div className="bg-gradient-to-br from-[#FFFEF9] to-[#FFF9E6] rounded-lg shadow-2xl p-8 border border-[#E8D4A0]">
                  {/* Decorative corner elements */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] opacity-60" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] opacity-60" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] opacity-60" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] opacity-60" />

                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-center text-[#8B4513] font-thai">คำอวยพรแด่คุณ</h2>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                    <p className="text-sm leading-relaxed text-[#5C4033] font-thai text-center">
                      ขอให้ท่านมีความสุข สุขภาพแข็งแรง
                      <br />
                      ประสบความสำเร็จในทุกๆ ด้าน
                      <br />
                      มีแต่สิ่งดีๆ เข้ามาในชีวิต
                      <br />
                      และครอบครัวมีความสุขยิ่งๆ ขึ้นไป
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
