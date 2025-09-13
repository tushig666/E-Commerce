import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("font-headline text-3xl tracking-[0.2em]", className)}>
      ÉCLAT
    </div>
  );
}
