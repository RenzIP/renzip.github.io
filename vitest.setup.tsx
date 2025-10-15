import "@testing-library/jest-dom";
import React, { ImgHTMLAttributes } from "react";

// --- ResizeObserver mock (tanpa any)
class ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
// pasang ke window tanpa cast any
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});

// --- matchMedia mock (sudah bertipe)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// --- polyfill ringan yang dibutuhkan cmdk / DOM
Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  value: vi.fn(),
  writable: true,
});

// --- next/image mock → pakai <img> tanpa any
vi.mock("next/image", () => {
  const Img = (props: ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", props);
  return { default: Img };
});
