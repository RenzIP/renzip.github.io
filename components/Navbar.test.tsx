import { render } from "@testing-library/react";
import Navbar from "./Navbar";

// (opsional) kalau Navbar pakai next/navigation:
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("<Navbar />", () => {
  it("punya link ke sections utama (projects, skills) dan ada contact (#contact atau mailto)", () => {
    const { container } = render(<Navbar />);

    const hrefs = Array.from(container.querySelectorAll("a"))
      .map((a) => a.getAttribute("href") || "");

    // wajib ada
    expect(hrefs).toContain("#projects");
    expect(hrefs).toContain("#skills");

    // contact boleh anchor section atau mailto
    const hasContactSection = hrefs.includes("#contact");
    const hasMailto = hrefs.some((h) => h.startsWith("mailto:"));
    expect(hasContactSection || hasMailto).toBe(true);
  });
});
