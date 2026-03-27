import { motion } from "framer-motion";
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useStore } from "@/lib/store";
import { timeSlots, bookedSlots } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function DateTimeSelector() {
  const { selectedDate, setDate, selectedTime, setTime } = useStore();
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const selectedDayIndex = selectedDate
    ? Math.round((selectedDate.getTime() - today.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24))
    : -1;

  const booked = bookedSlots[String(selectedDayIndex)] || [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-5 py-8"
    >
      <h2 className="font-display text-3xl text-foreground mb-6">DATA & HORÁRIO</h2>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-4" style={{ scrollbarWidth: "none" }}>
        {days.map((day, i) => {
          const isSelected = selectedDate?.toDateString() === day.toDateString();
          return (
            <button
              key={i}
              onClick={() => { setDate(day); setTime(null); }}
              className={cn(
                "flex flex-col items-center min-w-[60px] py-3 px-2 rounded-xl border transition-all",
                isSelected
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-muted-foreground/50"
              )}
            >
              <span className="text-[10px] uppercase font-medium">
                {format(day, "EEE", { locale: ptBR })}
              </span>
              <span className="text-xl font-bold mt-1">{format(day, "dd")}</span>
              <span className="text-[10px]">{format(day, "MMM", { locale: ptBR })}</span>
            </button>
          );
        })}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4"
        >
          <p className="text-sm text-muted-foreground mb-3">Horários disponíveis:</p>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((slot) => {
              const isBooked = booked.includes(slot);
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => setTime(slot)}
                  className={cn(
                    "py-2.5 rounded-lg text-sm font-medium transition-all border",
                    isBooked
                      ? "bg-secondary/50 text-muted-foreground/30 border-transparent cursor-not-allowed"
                      : isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(45_100%_50%/0.3)]"
                        : "bg-card border-border text-foreground hover:border-primary/50"
                  )}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
