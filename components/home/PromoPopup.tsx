"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import type { Settings } from "@/lib/api/settings";

/**
 * Builds a playable (controls, sound) embed URL for a YouTube or Vimeo link so
 * the promo video can be watched inside the popup. Returns null for anything
 * else — those are treated as a direct video file, or fall back to the image.
 */
function getPlayableEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    let id: string | undefined;
    if (host === "youtu.be") {
      id = u.pathname.slice(1) || undefined;
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      id =
        u.searchParams.get("v") ||
        u.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] ||
        undefined;
    }
    if (id) {
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;
    }

    if (host === "vimeo.com") {
      const vid = u.pathname.split("/").filter(Boolean)[0];
      if (vid) {
        return `https://player.vimeo.com/video/${vid}?autoplay=1`;
      }
    }
  } catch {
    // not a valid URL — fall through
  }
  return null;
}

export function PromoPopup({ settings }: { settings?: Settings }) {
  const [open, setOpen] = useState(false);

  const enabled = settings?.promo_enabled === "1";
  const mediaType = settings?.promo_media_type || "image";
  const image = settings?.promo_image;
  const videoUrl = settings?.promo_video_url;
  const link = settings?.promo_link;
  const title = settings?.promo_title;
  const subtitle = settings?.promo_subtitle;
  const buttonText = settings?.promo_button_text || "Watch Now";

  // Show automatically every time the homepage loads.
  useEffect(() => {
    if (enabled) setOpen(true);
  }, [enabled]);

  // Lock body scroll while the popup is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!enabled || !open) return null;

  const embedUrl = mediaType === "video" && videoUrl ? getPlayableEmbed(videoUrl) : null;
  const isDirectVideo = mediaType === "video" && Boolean(videoUrl) && !embedUrl;
  const showVideo = mediaType === "video" && Boolean(videoUrl);
  const showImage = !showVideo && Boolean(image);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title || "Promotion"}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Skip promotion"
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-brand-black/80 backdrop-blur-sm animate-fade-up"
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden bg-brand-black text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] animate-fade-up">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 z-20 h-[3px] bg-gradient-to-r from-brand-red via-brand-red/50 to-transparent" />

        {/* Skip / Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Skip promotion"
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-brand-black/50 text-white backdrop-blur-md transition-all duration-300 hover:border-brand-red hover:bg-brand-red"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

        {/* Media */}
        <div className="relative w-full overflow-hidden bg-brand-black-soft">
          {showVideo && embedUrl ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={embedUrl}
                title={title || "Promotional video"}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : showVideo && isDirectVideo ? (
            <video
              src={videoUrl}
              poster={image}
              autoPlay
              controls
              playsInline
              className="max-h-[60vh] w-full object-contain"
            />
          ) : showImage && image ? (
            link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt={title || "Promotion"}
                  className="max-h-[60vh] w-full object-contain"
                />
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={title || "Promotion"}
                className="max-h-[60vh] w-full object-contain"
              />
            )
          ) : (
            // Link-only (or no media): a branded panel so the popup still reads well.
            <div className="relative flex aspect-video w-full items-center justify-center bg-gradient-to-br from-brand-black via-brand-black-soft to-[#2a1116]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(232,29,37,0.25)_0%,transparent_60%)]" />
              <Play className="relative h-14 w-14 text-brand-red" strokeWidth={1.5} />
            </div>
          )}
        </div>

        {/* Copy + actions */}
        <div className="p-6 sm:p-7">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-[2px] w-8 bg-brand-red" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-red">
              Special Offer
            </span>
          </div>

          <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
            {title || "Don't miss out"}
          </h2>

          {subtitle && (
            <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
              {subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="group inline-flex items-center justify-center gap-3 bg-brand-red px-6 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-white hover:text-brand-black sm:text-[13px]"
              >
                <Play className="h-4 w-4 fill-current" strokeWidth={0} />
                <span>{buttonText}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:rotate-45"
                  strokeWidth={2.5}
                />
              </a>
            )}
            <button
              type="button"
              onClick={close}
              className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline sm:px-2"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
