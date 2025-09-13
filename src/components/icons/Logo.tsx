import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("font-headline text-2xl tracking-wider", className)}>
      Maison Éclat
    </div>
  );
}
