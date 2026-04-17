"use client";
import { GoldDivider } from "@/components/common/GoldDivider";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-shop py-20 text-center">
      <GoldDivider className="mb-5" />
      <h1 className="font-display text-3xl sm:text-4xl">Something did not stitch up right</h1>
      <p className="mt-2 text-muted max-w-md mx-auto">
        We ran into a small snag. Please try again in a moment.
      </p>
      <div className="mt-6 flex gap-3 justify-center">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
      {process.env.NODE_ENV === "development" && (
        <pre className="mt-10 mx-auto max-w-2xl text-left text-xs bg-ivory border border-border rounded-md p-4 overflow-auto">
          {error.message}
        </pre>
      )}
    </div>
  );
}
