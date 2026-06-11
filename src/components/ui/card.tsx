import * as React from "react";
import { cn } from "@/lib/utils";

type CardSize = "default" | "sm";
type CardVariant = "default" | "ghost" | "outline" | "elevated" | "interactive";

interface CardProps extends React.ComponentProps<"div"> {
  size?: CardSize;
  variant?: CardVariant;
}

function Card({ className, size = "default", variant = "default", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl",
        "bg-card text-card-foreground text-sm",
        "[--card-spacing:--spacing(4)]",
        "data-[size=sm]:[--card-spacing:--spacing(3)]",
        "py-(--card-spacing)",
        "has-data-[slot=card-footer]:pb-0",
        "data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        "has-[>img:first-child]:pt-0",
        "*:[img:first-child]:rounded-t-xl",
        "*:[img:last-child]:rounded-b-xl",
        variant === "default" && "ring-foreground/8 shadow-sm ring-1",
        variant === "ghost" && "bg-transparent shadow-none ring-0",
        variant === "outline" && "ring-border bg-transparent shadow-none ring-1",
        variant === "elevated" &&
          [
            "ring-foreground/5 ring-1",
            "shadow-[0_4px_12px_hsl(0_0%_0%/0.07),0_1px_3px_hsl(0_0%_0%/0.06)]",
            "dark:shadow-[0_4px_16px_hsl(0_0%_0%/0.25),0_1px_4px_hsl(0_0%_0%/0.2)]",
          ].join(" "),
        variant === "interactive" &&
          [
            "ring-foreground/8 shadow-sm ring-1",
            "cursor-pointer",
            "transition-[transform,box-shadow,ring-color] duration-200 ease-out",
            "motion-reduce:transition-none",
            "hover:-translate-y-0.5",
            "hover:shadow-[0_8px_24px_hsl(0_0%_0%/0.10),0_2px_6px_hsl(0_0%_0%/0.07)]",
            "hover:ring-foreground/12",
            "dark:hover:shadow-[0_8px_28px_hsl(0_0%_0%/0.3)]",
            "active:translate-y-0 active:shadow-sm",
            "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
          ].join(" "),
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header",
        "group/card-header",
        "grid auto-rows-min items-start gap-1",
        "rounded-t-xl px-(--card-spacing)",
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        "[.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading leading-snug font-medium",
        "text-base group-data-[size=sm]/card:text-sm",
        "text-foreground/95",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-muted-foreground text-sm leading-relaxed",
        "line-clamp-3 group-data-[size=sm]/card:line-clamp-2",
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1",
        "self-start justify-self-end",
        "-mt-1 -mr-1",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", "[&>*:last-child]:mb-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center gap-2",
        "rounded-b-xl border-t",
        "p-(--card-spacing)",
        "bg-muted/40",
        "border-border/60",
        "[&>*:last-child]:ml-auto",
        className,
      )}
      {...props}
    />
  );
}

function CardDivider({ className, ...props }: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="card-divider"
      className={cn("h-px border-none", "bg-border/50 mx-(--card-spacing)", className)}
      aria-hidden
      {...props}
    />
  );
}

function CardBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="card-badge"
      className={cn(
        "inline-flex items-center gap-1",
        "border-border/60 rounded-full border",
        "bg-muted/60 px-2 py-0.5",
        "text-muted-foreground text-[11px] font-medium tracking-wide uppercase",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardDivider,
  CardBadge,
};
