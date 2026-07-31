"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  id: string;
  name: string;
  options: readonly string[];
  defaultValue?: string;
  variant?: "light" | "dark";
  className?: string;
};

export default function ThemedSelect({
  id,
  name,
  options,
  defaultValue,
  variant = "light",
  className = "",
}: Props) {
  const initialValue = defaultValue && options.includes(defaultValue) ? defaultValue : options[0];
  const [value, setValue] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.indexOf(initialValue)));
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    const onReset = () => {
      setValue(initialValue);
      setActiveIndex(Math.max(0, options.indexOf(initialValue)));
      setOpen(false);
    };
    form?.addEventListener("reset", onReset);
    return () => form?.removeEventListener("reset", onReset);
  }, [initialValue, options]);

  const choose = (index: number) => {
    setValue(options[index]);
    setActiveIndex(index);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const move = (nextIndex: number) => {
    const wrapped = (nextIndex + options.length) % options.length;
    setActiveIndex(wrapped);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(Math.max(0, options.indexOf(value)));
      } else {
        move(activeIndex + (event.key === "ArrowDown" ? 1 : -1));
      }
      return;
    }
    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(options.length - 1);
      return;
    }
    if ((event.key === "Enter" || event.key === " ") && open) {
      event.preventDefault();
      choose(activeIndex);
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key === "Tab" && open) setOpen(false);
  };

  const dark = variant === "dark";

  return (
    <div ref={rootRef} className="relative w-full min-w-0">
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined}
        onClick={() => {
          setActiveIndex(Math.max(0, options.indexOf(value)));
          setOpen((current) => !current);
        }}
        onKeyDown={onKeyDown}
        className={`${className} group/select relative flex min-h-11 touch-manipulation items-center pr-12 text-left transition-[border-color,box-shadow,background-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35`}
      >
        <span className="min-w-0 flex-1 truncate">{value}</span>
        <span
          className={`absolute right-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-200 ${
            dark ? "bg-white/10 text-brand group-hover/select:bg-brand group-hover/select:text-white" : "bg-brand-soft text-brand-deep group-hover/select:bg-brand group-hover/select:text-white"
          } ${open ? "rotate-180 bg-brand text-white" : ""}`}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-label={name === "service" ? "What do you need?" : "Property type"}
          className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-[70] max-h-72 overflow-y-auto rounded-2xl border p-2 shadow-[0_24px_60px_-18px_rgba(17,17,18,0.5)] ${
            dark ? "border-white/15 bg-[#1b1b1c] text-white" : "border-brand/25 bg-white text-ink"
          }`}
        >
          {options.map((option, index) => {
            const selected = option === value;
            const active = index === activeIndex;
            return (
              <div
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={selected}
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => choose(index)}
                className={`flex min-h-11 cursor-pointer select-none items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm leading-snug transition-colors duration-150 ${
                  selected
                    ? "bg-brand font-semibold text-white"
                    : active
                      ? dark
                        ? "bg-white/10 text-white"
                        : "bg-brand-soft text-ink"
                      : dark
                        ? "text-white/80"
                        : "text-ink/75"
                }`}
              >
                <span>{option}</span>
                {selected && (
                  <svg className="shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
