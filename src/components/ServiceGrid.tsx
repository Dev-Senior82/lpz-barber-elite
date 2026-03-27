import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { services } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function ServiceGrid() {
  const { selectedServices, toggleService } = useStore();

  return (
    <section className="px-5 py-8">
      <h2 className="font-display text-3xl text-foreground mb-6">SERVIÇOS</h2>
      <div className="grid grid-cols-2 gap-3">
        {services.map((service, i) => {
          const isSelected = selectedServices.some((s) => s.id === service.id);
          return (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => toggleService(service)}
              className={cn(
                "relative flex flex-col items-start p-4 rounded-xl border transition-all text-left",
                isSelected
                  ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(45_100%_50%/0.15)]"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <span className="text-2xl mb-2">{service.icon}</span>
              <span className="font-semibold text-foreground text-sm">{service.name}</span>
              <span className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                <Clock size={12} /> {service.duration} min
              </span>
              <span className="mt-3 inline-block bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full">
                R$ {service.price.toFixed(2)}
              </span>
              {isSelected && (
                <motion.div
                  layoutId="check"
                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                >
                  <span className="text-primary-foreground text-xs font-bold">✓</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
