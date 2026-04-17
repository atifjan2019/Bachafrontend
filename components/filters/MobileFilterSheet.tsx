"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function MobileFilterSheet({
  open,
  onClose,
  children,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  onClear?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent side="bottom">
        <DialogTitle>Filters</DialogTitle>
        <div className="mt-4 space-y-6">{children}</div>
        <div className="mt-6 flex gap-2">
          {onClear && (
            <Button variant="outline" className="flex-1" onClick={onClear}>
              Clear
            </Button>
          )}
          <Button className="flex-1" onClick={onClose}>
            Show Results
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
