import { cn } from "cn";
import { ClawMark } from "@/components/brand/claw-mark";

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "xl" | "lg" | "md";
};

export function SectionHeading({ eyebrow, title, lead, align = "left", className, as: Tag = "h2", size = "lg" }: Props) {
  const sizeClass = size === "xl" ? "display-xl" : size === "md" ? "display-md" : "display-lg";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", align === "center" && "justify-center")}>
          <ClawMark className="text-brand-gold" />
          {eyebrow}
        </p>
      )}
      <Tag className={cn(sizeClass, "text-balance")}>{title}</Tag>
      {lead && <p className="lead mt-5 text-pretty">{lead}</p>}
    </div>
  );
}
