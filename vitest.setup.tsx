import "@testing-library/jest-dom";
import React from "react";

class ResizeObserver { observe(){} unobserve(){} disconnect(){} }
(global as any).ResizeObserver = ResizeObserver;

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (q: string) => ({
    matches: false, media: q, onchange: null,
    addListener: () => {}, removeListener: () => {},
    addEventListener: () => {}, removeEventListener: () => {}, dispatchEvent: () => false,
  }),
});

vi.mock("next/image", () => ({
  default: (props: any) => React.createElement("img", props),
}));

Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  value: vi.fn(),
  writable: true,
});
