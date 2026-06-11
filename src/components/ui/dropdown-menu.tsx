"use client";

import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { ChevronRightIcon, CheckIcon } from "lucide-react";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

export interface DropdownMenuTriggerProps extends Omit<MenuPrimitive.Trigger.Props, "render"> {
  asChild?: boolean;
}

function DropdownMenuTrigger({ asChild = false, children, ...props }: DropdownMenuTriggerProps) {
  if (asChild && React.isValidElement(children)) {
    return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" render={children} {...props} />;
  }
  return (
    <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props}>
      {children}
    </MenuPrimitive.Trigger>
  );
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) min-w-[200px] origin-(--transform-origin)",
            "overflow-x-hidden overflow-y-auto",
            "rounded-xl",
            "bg-popover/95 text-popover-foreground",
            "backdrop-blur-md",
            "border-border border",
            "shadow-md",
            "p-1.5",
            "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-[0.97]",
            "data-[side=bottom]:data-open:slide-in-from-top-1",
            "data-[side=top]:data-open:slide-in-from-bottom-1",
            "data-[side=left]:data-open:slide-in-from-right-1",
            "data-[side=right]:data-open:slide-in-from-left-1",
            "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-[0.97]",
            "data-closed:overflow-hidden",
            "duration-150",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & { inset?: boolean }) {
  return (
    <div
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase",
        "text-slate-500 select-none",
        "data-inset:pl-8",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/item relative flex cursor-default items-center gap-2",
        "rounded-lg px-2 py-1.5",
        "text-popover-foreground text-[13px] font-[450]",
        "outline-none select-none",
        "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2",
        "before:h-0 before:w-[2px] before:rounded-full before:bg-indigo-400",
        "before:transition-all before:duration-150",
        "focus:before:h-[60%]",
        "transition-colors duration-100",
        "focus:bg-accent focus:text-accent-foreground",
        "data-inset:pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-35",
        "data-[variant=destructive]:text-red-400",
        "data-[variant=destructive]:focus:bg-red-500/10",
        "data-[variant=destructive]:focus:text-red-300",
        "data-[variant=destructive]:before:bg-red-400",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-[15px]",
        "[&_svg]:text-muted-foreground",
        "focus:[&_svg]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2",
        "rounded-lg px-2 py-1.5",
        "text-popover-foreground text-[13px] font-[450]",
        "outline-none select-none",
        "before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2",
        "before:h-0 before:w-[2px] before:rounded-full before:bg-indigo-400",
        "before:transition-all before:duration-150",
        "focus:before:h-[60%]",
        "transition-colors duration-100",
        "focus:bg-accent focus:text-accent-foreground",
        "data-popup-open:bg-accent data-popup-open:text-accent-foreground",
        "data-popup-open:before:h-[60%]",
        "data-inset:pl-8",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0",
        "[&_svg:not([class*='size-'])]:size-[15px]",
        "[&_svg]:text-muted-foreground",
        "focus:[&_svg]:text-accent-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-3.5 text-slate-500" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -4,
  side = "right",
  sideOffset = 2,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-[160px]", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2",
        "rounded-lg py-1.5 pr-2 pl-7",
        "text-popover-foreground text-[13px] font-[450]",
        "outline-none select-none",
        "transition-colors duration-100",
        "focus:bg-accent focus:text-accent-foreground",
        "data-inset:pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-35",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[13px]",
        className,
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center rounded-[4px] border border-white/20 transition-colors data-[checked]:border-indigo-500 data-[checked]:bg-indigo-500"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon className="size-[10px] stroke-[3] text-white" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & { inset?: boolean }) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-2",
        "rounded-lg py-1.5 pr-2 pl-7",
        "text-popover-foreground text-[13px] font-[450]",
        "outline-none select-none",
        "transition-colors duration-100",
        "focus:bg-accent focus:text-accent-foreground",
        "data-inset:pl-8",
        "data-disabled:pointer-events-none data-disabled:opacity-35",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[13px]",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-2 flex size-4 items-center justify-center rounded-full border border-white/20 transition-colors"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <span className="block size-1.5 rounded-full bg-indigo-400" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1.5 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-[11px] tracking-widest",
        "font-mono text-slate-500",
        "group-focus/item:text-slate-400",
        className,
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
