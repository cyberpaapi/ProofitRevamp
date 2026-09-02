"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type { SiteCopyOverride } from "@/lib/admin/types";

export default function SiteCopyRuntime() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    let cancelled = false;
    let observer: MutationObserver | undefined;
    fetch("/api/public/site-copy", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { siteCopy?: SiteCopyOverride[]; imageOverrides?: Record<string, string> }) => {
        if (cancelled) return;
        const overrides = (data.siteCopy || []).filter((item) => item.enabled && (item.page === "*" || item.page === pathname) && item.original.trim());
        const imageOverrides = data.imageOverrides || {};
        if (!overrides.length && !Object.keys(imageOverrides).length) return;
        const apply = () => {
          if (overrides.length) replaceTextNodes(document.body, overrides);
          if (Object.keys(imageOverrides).length) replaceImageSources(document.body, imageOverrides);
        };
        apply();
        observer = new MutationObserver(apply);
        observer.observe(document.body, { childList: true, subtree: true });
      })
      .catch(() => undefined);
    return () => { cancelled = true; observer?.disconnect(); };
  }, [pathname]);
  return null;
}

function replaceImageSources(root: HTMLElement, overrides: Record<string, string>) {
  root.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
    const original = image.dataset.cmsOriginalSrc || imagePath(image.getAttribute("src"));
    if (!original || !overrides[original]) return;
    image.dataset.cmsOriginalSrc = original;
    if (image.getAttribute("src") !== overrides[original]) image.setAttribute("src", overrides[original]);
    image.removeAttribute("srcset");
  });

  root.querySelectorAll<HTMLElement>("[style*='/images/']").forEach((element) => {
    const original = element.dataset.cmsOriginalStyle || element.getAttribute("style") || "";
    let replacement = original;
    for (const [path, url] of Object.entries(overrides)) replacement = replacement.replaceAll(path, url);
    if (replacement !== original) {
      element.dataset.cmsOriginalStyle = original;
      element.setAttribute("style", replacement);
    }
  });
}

function imagePath(src: string | null) {
  if (!src) return "";
  try {
    const url = new URL(src, window.location.origin);
    if (url.pathname === "/_next/image") {
      const nested = url.searchParams.get("url");
      return nested ? new URL(nested, window.location.origin).pathname : "";
    }
    return url.pathname;
  } catch {
    return src.split("?")[0] || "";
  }
}

function replaceTextNodes(root: HTMLElement, overrides: SiteCopyOverride[]) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const parent = node.parentElement;
    if (parent && !parent.closest("script,style,noscript,[data-cms-ignore]") && node.nodeValue?.trim()) {
      for (const override of overrides) {
        if (node.nodeValue.includes(override.original)) node.nodeValue = node.nodeValue.replaceAll(override.original, override.replacement);
      }
    }
    node = walker.nextNode();
  }
}
