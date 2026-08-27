"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-navy !border !border-gold/40 !text-ivory !rounded-md !shadow-[0_12px_40px_rgba(0,0,0,0.5)] font-sans",
          title: "!text-ivory !font-medium",
          description: "!text-ivory-dim",
          actionButton: "!bg-gold !text-ink",
          cancelButton: "!bg-ink-elevated !text-ivory-dim",
          success: "!border-gold/60",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
