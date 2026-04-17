"use client";
import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ToastContextValue = {
  show: (args: { title: string; description?: string; tone?: "default" | "success" | "error" }) => void;
};

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}

type Entry = {
  id: number;
  title: string;
  description?: string;
  tone: "default" | "success" | "error";
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = React.useState<Entry[]>([]);

  const show = React.useCallback<ToastContextValue["show"]>(({ title, description, tone = "default" }) => {
    const id = Date.now() + Math.random();
    setEntries((e) => [...e, { id, title, description, tone }]);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={3500}>
        {children}
        {entries.map((e) => (
          <ToastPrimitive.Root
            key={e.id}
            onOpenChange={(open) => {
              if (!open) setEntries((list) => list.filter((x) => x.id !== e.id));
            }}
            className={cn(
              "data-[state=open]:animate-fade-in bg-ivory border border-border rounded-lg shadow-card-hover p-4 flex gap-3 items-start w-[320px]",
              e.tone === "success" && "border-l-4 border-l-green-600",
              e.tone === "error" && "border-l-4 border-l-brand-red"
            )}
          >
            <div className="flex-1">
              <ToastPrimitive.Title className="font-medium text-sm text-brand-black">
                {e.title}
              </ToastPrimitive.Title>
              {e.description && (
                <ToastPrimitive.Description className="text-xs text-muted mt-1">
                  {e.description}
                </ToastPrimitive.Description>
              )}
            </div>
            <ToastPrimitive.Close aria-label="Close" className="text-muted hover:text-brand-black">
              <X className="h-4 w-4" />
            </ToastPrimitive.Close>
          </ToastPrimitive.Root>
        ))}
        <ToastPrimitive.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 z-[100] outline-none" />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
