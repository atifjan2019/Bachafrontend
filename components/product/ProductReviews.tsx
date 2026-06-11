"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { createReview } from "@/lib/api/reviews";
import type { Review } from "@/types";

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= rating ? "fill-brand-red text-brand-red" : "fill-transparent text-ink-30"}`}
          strokeWidth={1.5}
        />
      ))}
    </span>
  );
}

export function ProductReviews({
  slug,
  initialReviews,
  initialAverage,
  initialCount,
}: {
  slug: string;
  initialReviews: Review[];
  initialAverage: number;
  initialCount: number;
}) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [average, setAverage] = useState(initialAverage);
  const [count, setCount] = useState(initialCount);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || !name.trim()) return;
    setStatus("loading");
    try {
      const created = await createReview(slug, {
        author_name: name.trim(),
        rating,
        comment: comment.trim(),
      });
      const next = [created, ...reviews];
      setReviews(next);
      setCount(next.length);
      setAverage(
        Math.round((next.reduce((s, r) => s + r.rating, 0) / next.length) * 10) / 10
      );
      setName("");
      setComment("");
      setRating(5);
      setStatus("success");
      setOpen(false);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="mt-16 lg:mt-24">
      <div className="mb-8 flex flex-col gap-4 border-b border-ink-10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-red">
            Reviews
          </p>
          <h2 className="font-display text-2xl text-brand-black sm:text-3xl">Customer reviews</h2>
          <div className="mt-3 flex items-center gap-3">
            <Stars rating={Math.round(average)} />
            <span className="text-sm text-ink-50">
              {count > 0 ? `${average.toFixed(1)} · ${count} review${count === 1 ? "" : "s"}` : "No reviews yet"}
            </span>
          </div>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex shrink-0 items-center justify-center border-2 border-brand-black px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-brand-black transition-colors hover:bg-brand-black hover:text-white"
        >
          {open ? "Close" : "Write a review"}
        </button>
      </div>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mb-10 max-w-xl space-y-4 border border-ink-10 bg-surface-soft p-5 sm:p-6"
        >
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-black">Your name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-ink-10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-black"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-black">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHover(n)}
                  onMouseLeave={() => setHover(0)}
                  aria-label={`${n} star`}
                >
                  <Star
                    className={`h-6 w-6 transition-colors ${
                      n <= (hover || rating)
                        ? "fill-brand-red text-brand-red"
                        : "fill-transparent text-ink-30"
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-brand-black">Review</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience…"
              className="w-full border border-ink-10 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-black"
            />
          </div>
          {status === "error" && (
            <p className="text-xs text-brand-red">Couldn’t submit your review. Please try again.</p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="inline-flex items-center justify-center bg-brand-red px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-red-dark disabled:opacity-70"
          >
            {status === "loading" ? "Submitting…" : "Submit review"}
          </button>
        </form>
      )}

      {status === "success" && !open && (
        <p className="mb-6 border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-sm text-brand-black">
          Thank you! Your review has been posted.
        </p>
      )}

      {reviews.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2">
          {reviews.map((r) => (
            <li key={r.id} className="border border-ink-10 p-5">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold text-brand-black">{r.author_name}</span>
                <Stars rating={r.rating} />
              </div>
              {r.comment && (
                <p className="mt-3 text-sm leading-relaxed text-ink-70">{r.comment}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink-50">Be the first to review this product.</p>
      )}
    </section>
  );
}
