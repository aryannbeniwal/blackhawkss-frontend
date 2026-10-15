"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the element travels up while fading in */
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "article";
};

/** Fade-and-rise on scroll. Respects prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, y = 24, once = true, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay } },
  };
  return (
    <Comp className={className} initial="hidden" whileInView="show" viewport={{ once, margin: "0px 0px -10% 0px" }} variants={variants}>
      {children}
    </Comp>
  );
}

/** Staggers direct children (each wrapped in RevealItem). */
export function RevealGroup({ children, className, stagger = 0.07, as = "div" }: { children: ReactNode; className?: string; stagger?: number; as?: "div" | "ul" | "ol" }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({ children, className, as = "div", y = 20 }: { children: ReactNode; className?: string; as?: "div" | "li" | "article"; y?: number }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </Comp>
  );
}
