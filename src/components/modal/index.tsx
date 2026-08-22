"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButton.current?.focus();
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") router.back();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [router]);

  return (
    <div
      aria-labelledby="contact-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-slate-950/55 p-4 backdrop-blur-md sm:p-8"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) router.back();
      }}
      role="dialog"
    >
      <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-2xl shadow-slate-950/30">
        <button
          aria-label="Fechar detalhes"
          className="absolute right-5 top-5 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-xl font-bold text-slate-600 shadow-md transition hover:rotate-90 hover:text-rose-600 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          onClick={() => router.back()}
          ref={closeButton}
          type="button"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
