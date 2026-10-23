"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site-config";

export default function SiteEffects() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("no-js");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const abort = new AbortController();
    const observers: IntersectionObserver[] = [];
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const later = (fn: () => void, delay: number) => {
      const id = setTimeout(() => { timers.delete(id); fn(); }, delay);
      timers.add(id);
      return id;
    };
    const observe = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
      const observer = new IntersectionObserver(callback, options);
      observers.push(observer);
      return observer;
    };

    const copyBtns = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-copy-ca]"));
    const copyTimers = new Map<HTMLButtonElement, ReturnType<typeof setTimeout>>();
    const copyText = async (text: string) => {
      if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(text); return true; } catch { /* fallback */ }
      }
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      Object.assign(textarea.style, { position: "fixed", top: "-1000px", opacity: "0" });
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, text.length);
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { /* no clipboard */ }
      textarea.remove();
      return ok;
    };
    copyBtns.forEach((copyBtn) => {
      const defaultLabel = copyBtn.textContent?.trim() || "Copy";
      copyBtn.addEventListener("click", async () => {
        const ok = await copyText(siteConfig.ca);
        if (abort.signal.aborted) return;
        copyBtn.textContent = ok ? "Copied" : "Failed";
        copyBtn.classList.toggle("is-copied", ok);
        const existing = copyTimers.get(copyBtn);
        if (existing) { clearTimeout(existing); timers.delete(existing); }
        const copyTimer = later(() => {
          copyBtn.textContent = defaultLabel;
          copyBtn.classList.remove("is-copied");
          copyTimers.delete(copyBtn);
        }, 1600);
        copyTimers.set(copyBtn, copyTimer);
      }, { signal: abort.signal });
    });

    const nav = document.querySelector<HTMLElement>(".nav");
    const toggle = document.querySelector<HTMLButtonElement>(".nav__toggle");
    const menu = document.getElementById("mobile-menu");
    let menuRaf = 0;
    const setMenu = (open: boolean) => {
      if (!toggle || !menu || !nav) return;
      cancelAnimationFrame(menuRaf);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      if (open) {
        menu.hidden = false;
        menuRaf = requestAnimationFrame(() => menu.classList.add("is-open"));
      } else {
        menu.classList.remove("is-open");
        const hide = () => { if (!menu.classList.contains("is-open")) menu.hidden = true; };
        if (reduceMotion) hide(); else later(hide, 400);
      }
    };
    toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"), { signal: abort.signal });
    menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false), { signal: abort.signal }));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    }, { signal: abort.signal });
    window.matchMedia("(min-width: 900px)").addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    }, { signal: abort.signal });

    const hasObserver = "IntersectionObserver" in window;
    const hero = document.querySelector(".hero");
    if (hero && hasObserver) {
      observe(([entry]) => nav?.classList.toggle("is-scrolled", entry.intersectionRatio < 0.92), { threshold: [0, 0.92] }).observe(hero);
    }
    if (hasObserver) {
      const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav__links a");
      const activeObserver = observe((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`));
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      ["about", "how-to-buy"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) activeObserver.observe(el);
      });
    }
    const revealEls = document.querySelectorAll(".reveal, .letters__row");
    if (reduceMotion || !hasObserver) revealEls.forEach((el) => el.classList.add("is-visible"));
    else {
      const revealObserver = observe((entries, observer) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }), { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
      revealEls.forEach((el) => revealObserver.observe(el));
    }

    let parallaxRaf = 0;
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!reduceMotion && parallaxEls.length && hasObserver) {
      const active = new Set<HTMLElement>();
      const update = () => {
        parallaxRaf = 0;
        const vh = window.innerHeight;
        active.forEach((el) => {
          if (!el.parentElement) return;
          const rect = el.parentElement.getBoundingClientRect();
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          const speed = Number.parseFloat(el.dataset.parallax || "0.1");
          el.style.transform = `translate3d(${(progress * speed * -100).toFixed(2)}px,${(progress * speed * 160).toFixed(2)}px,0)`;
        });
      };
      const onScroll = () => { if (!parallaxRaf && active.size) parallaxRaf = requestAnimationFrame(update); };
      const parallaxObserver = observe((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) active.add(entry.target as HTMLElement);
          else active.delete(entry.target as HTMLElement);
        });
        onScroll();
      });
      parallaxEls.forEach((el) => parallaxObserver.observe(el));
      window.addEventListener("scroll", onScroll, { passive: true, signal: abort.signal });
    }
    return () => {
      abort.abort();
      observers.forEach((observer) => observer.disconnect());
      timers.forEach(clearTimeout);
      cancelAnimationFrame(menuRaf);
      cancelAnimationFrame(parallaxRaf);
    };
  }, []);
  return null;
}
