import { Instagram, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 text-center pb-24">
      <p className="text-muted-foreground text-xs flex items-center justify-center gap-1">
        <MapPin size={12} /> Rua Exemplo, 123 - Centro, São Paulo - SP
      </p>
      <a
        href="https://instagram.com/lpzbarber"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 mt-3 text-sm text-foreground hover:text-primary transition-colors"
      >
        <Instagram size={16} /> @lpzbarber
      </a>
      <p className="text-muted-foreground/50 text-[10px] mt-4">© 2026 LPZ Barber. Todos os direitos reservados.</p>
    </footer>
  );
}
