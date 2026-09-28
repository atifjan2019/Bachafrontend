"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";

/**
 * Drop-in replacement for next/image that degrades to a branded panel when the
 * source fails to load.
 *
 * Catalog images live on the media CDN, and a record can outlive its object
 * (deleted bucket, bad key, failed upload). When that happens a bare <Image>
 * leaves an empty box with the alt text showing through, which reads as a
 * broken page rather than a missing photo. Rendering our own panel keeps the
 * card looking deliberate and the layout stable — the wrapper still reserves
 * the same space, so nothing shifts.
 *
 * While the source loads fine this renders exactly what next/image would, so
 * adopting it changes nothing visually on a healthy page.
 */

/** Reported once per URL per page load, so a grid of dead images logs one line each. */
const reported = new Set<string>();

function reportFailure(src: string) {
  if (!src || reported.has(src)) return;
  reported.add(src);

  // Surfaced for monitoring: a broken asset should show up in logs/RUM before a
  // customer reports it.
  console.warn(`[media] image failed to load: ${src}`);
  window.dispatchEvent(new CustomEvent("media:image-error", { detail: { src } }));
}

type SafeImageProps = Omit<ImageProps, "onError" | "src"> & {
  /** Absent/empty renders the fallback panel without attempting a request. */
  src?: ImageProps["src"] | null;
  /** Word whose first letter becomes the fallback monogram. Defaults to `alt`. */
  fallbackLabel?: string;
  /**
   * Tried once before giving up on the panel — use for a known-good local asset
   * (e.g. the packaged logo behind a remote logo URL).
   */
  fallbackSrc?: string;
  /** Extra classes for the fallback panel. */
  fallbackClassName?: string;
  /**
   * Replaces the default panel entirely. Pass `null` where the surrounding
   * markup already looks complete without the image (e.g. a decorative
   * backdrop over a styled section).
   */
  fallback?: React.ReactNode;
};

export function SafeImage({
  fallbackLabel,
  fallbackSrc,
  fallbackClassName = "",
  fallback,
  src,
  alt,
  className,
  ...rest
}: SafeImageProps) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  // A reused instance (gallery arrows, a re-keyed grid cell) must retry the new
  // source instead of staying stuck on the previous failure.
  useEffect(() => {
    setCurrent(src);
    setFailed(false);
  }, [src]);

  const handleError = useCallback(() => {
    setCurrent((prev) => {
      if (typeof prev === "string") reportFailure(prev);
      if (fallbackSrc && prev !== fallbackSrc) return fallbackSrc;
      setFailed(true);
      return prev;
    });
  }, [fallbackSrc]);

  // These pages are server-rendered, so the browser starts fetching the image
  // from the HTML long before React hydrates and attaches onError. A source
  // that fails in that window fires its error event into the void and the
  // handler below never runs. Re-check the element once on mount: a finished
  // image with no intrinsic width is a failed one.
  const checkLoaded = useCallback(
    (node: HTMLImageElement | null) => {
      if (node?.complete && node.naturalWidth === 0) handleError();
    },
    [handleError]
  );

  const missing = current === null || current === undefined || current === "";

  if (failed || missing) {
    if (fallback !== undefined) return <>{fallback}</>;

    const label = (fallbackLabel ?? (typeof alt === "string" ? alt : "")).trim();
    const monogram = label.charAt(0).toUpperCase();

    // `fill` images are laid out by the positioned parent, so the panel has to
    // cover it. Sized images sit in normal flow and keep their own box instead.
    const layout = rest.fill
      ? "absolute inset-0"
      : "relative h-full w-full";

    return (
      <div
        className={`${layout} flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-black via-brand-black-soft to-[#2a1116] ${fallbackClassName}`}
        role="img"
        aria-label={typeof alt === "string" && alt ? alt : "Image unavailable"}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,29,37,0.22)_0%,transparent_60%)]" />
        {monogram && (
          <span className="relative font-display text-[3.5rem] font-bold leading-none text-white/[0.08] sm:text-[5rem]">
            {monogram}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image
      {...rest}
      ref={checkLoaded}
      src={current as ImageProps["src"]}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
