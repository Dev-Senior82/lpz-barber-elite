import { motion } from "framer-motion";
import { portfolioImages } from "@/lib/data";
import { useRef } from "react";

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8">
      <h2 className="font-display text-3xl text-foreground mb-6 px-5">NOSSOS CORTES</h2>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {portfolioImages.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-56 h-56 rounded-xl overflow-hidden snap-center border border-border"
          >
            <img
              src={img}
              alt={`Corte ${i + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
