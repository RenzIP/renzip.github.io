import { render, screen } from "@testing-library/react";
import SectionSnap from "./SectionSnap";

describe("<SectionSnap />", () => {
  it("render section dengan id & content", () => {
    render(<SectionSnap id="skills"><div>Halo</div></SectionSnap>);
    const el = screen.getByText("Halo");
    expect(el).toBeInTheDocument();
    const section = el.closest("section")!;
    expect(section.id).toBe("skills");
  });
});
