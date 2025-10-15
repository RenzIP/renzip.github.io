import { cn } from "./utils";

describe("cn()", () => {
  it("merging kelas truthy dan mengabaikan falsy", () => {
    expect(cn("px-2", false && "py-2", "text-sm")).toBe("px-2 text-sm");
  });

  it("prioritaskan kelas terakhir (tailwind-merge)", () => {
    const out = cn("p-2", "p-4");
    expect(out.includes("p-4")).toBe(true);
    expect(out.includes("p-2")).toBe(false);
  });
});
