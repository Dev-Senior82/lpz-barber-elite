import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categories = ["Todos", "Tratamento", "Finalização", "Equipamento", "Acessório", "Bebida", "Snack"];

export default function ProductShop() {
  const { selectedProducts, toggleProduct } = useStore();
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = activeCategory === "Todos"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <section className="px-5 py-8">
      <h2 className="font-display text-3xl text-foreground mb-4">PRODUTOS</h2>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-4" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "text-xs px-3 py-1.5 rounded-full whitespace-nowrap border transition-all",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((product, i) => {
          const isSelected = selectedProducts.some((p) => p.id === product.id);
          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggleProduct(product)}
              className={cn(
                "flex flex-col items-center p-4 rounded-xl border transition-all text-center",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-muted-foreground/30"
              )}
            >
              <span className="text-3xl mb-2">{product.image}</span>
              <span className="text-xs font-medium text-foreground leading-tight">{product.name}</span>
              <span className="text-[10px] text-muted-foreground mt-1">{product.category}</span>
              <span className="mt-2 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full">
                R$ {product.price.toFixed(2)}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
