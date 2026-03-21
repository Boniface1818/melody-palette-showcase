import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`section-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
