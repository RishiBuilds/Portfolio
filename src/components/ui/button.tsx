import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center",
    "whitespace-nowrap select-none",
    "rounded-lg border border-transparent bg-clip-padding",
    "text-sm font-medium",
    "transition-[color,background-color,border-color,box-shadow,transform,opacity]",
    "duration-150 ease-out",
    "motion-reduce:transition-none",
    "outline-none",
    "focus-visible:border-ring",
    "focus-visible:ring-3 focus-visible:ring-ring/50",
    "active:not-aria-[haspopup]:scale-[0.97]",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-40",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_1px_2px_hsl(0_0%_0%/0.15)]",
          "hover:bg-primary/90",
          "active:not-aria-[haspopup]:bg-primary/80",
        ].join(" "),

        outline: [
          "border-border bg-background text-foreground",
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:border-input dark:bg-input/30",
          "dark:hover:bg-input/50",
        ].join(" "),

        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_7%)]",
          "aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ].join(" "),

        ghost: [
          "hover:bg-muted hover:text-foreground",
          "aria-expanded:bg-muted aria-expanded:text-foreground",
          "dark:hover:bg-muted/50",
        ].join(" "),

        destructive: [
          "bg-destructive/10 text-destructive",
          "hover:bg-destructive/20",
          "focus-visible:border-destructive/40 focus-visible:ring-destructive/20",
          "dark:bg-destructive/20 dark:hover:bg-destructive/30",
          "dark:focus-visible:ring-destructive/40",
        ].join(" "),

        link: [
          "text-primary underline-offset-4",
          "hover:underline hover:text-primary/80",
          "active:not-aria-[haspopup]:translate-y-0",
        ].join(" "),

        glow: [
          "relative bg-primary text-primary-foreground overflow-hidden",
          "shadow-[0_0_0_1px_hsl(var(--primary)/0.3),0_2px_8px_hsl(var(--primary)/0.35)]",
          "hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.5),0_4px_16px_hsl(var(--primary)/0.45)]",
          "hover:bg-primary/95",
          "before:absolute before:inset-0",
          "before:translate-x-[-110%] hover:before:translate-x-[110%]",
          "before:transition-transform before:duration-500 before:ease-in-out",
          "before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent",
          "before:pointer-events-none",
        ].join(" "),
      },

      size: {
        xs: [
          "h-6 gap-1 px-2 text-xs",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        sm: [
          "h-7 gap-1 px-2.5 text-[0.8rem]",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
          "[&_svg:not([class*='size-'])]:size-3.5",
        ].join(" "),

        default: [
          "h-8 gap-1.5 px-2.5",
          "has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        ].join(" "),

        lg: [
          "h-10 gap-2 px-4 text-base",
          "has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        ].join(" "),

        xl: [
          "h-12 gap-2 px-5 text-base font-semibold",
          "rounded-xl",
          "has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        ].join(" "),

        "icon-xs": [
          "size-6",
          "rounded-[min(var(--radius-md),10px)]",
          "in-data-[slot=button-group]:rounded-lg",
          "[&_svg:not([class*='size-'])]:size-3",
        ].join(" "),

        "icon-sm": [
          "size-7",
          "rounded-[min(var(--radius-md),12px)]",
          "in-data-[slot=button-group]:rounded-lg",
        ].join(" "),

        icon: "size-8",
        "icon-lg": "size-10 rounded-xl",
        "icon-xl": "size-12 rounded-xl [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends Omit<ButtonPrimitive.Props, "render">, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));
  const isDisabled = disabled || loading;

  if (asChild && React.isValidElement(children)) {
    return (
      <ButtonPrimitive
        data-slot="button"
        className={classes}
        render={children}
        nativeButton={false}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        {...props}
      />
    );
  }

  return (
    <ButtonPrimitive
      data-slot="button"
      className={classes}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Spinner />
          <span className="opacity-70">{children}</span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
