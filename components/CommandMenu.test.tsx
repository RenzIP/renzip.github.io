import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommandMenu from "./CommandMenu";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: pushMock }) }));
vi.mock("@/lib/projects", () => ({
  projects: [{ id: "p1", title: "Demo Project", tags: ["next"], link: "/demo" }],
}));

describe("<CommandMenu />", () => {
  it("Ctrl+K membuka palette dan pilih 'Projects' memanggil router.push('#projects')", async () => {
    render(<CommandMenu />);

    // buka palette tanpa warning act
    await userEvent.keyboard("{Control>}k{/Control}");

    // cari container list (pakai heading 'Sections')
    const sectionsHeading = await screen.findByText(/sections/i);
    const listContainer = sectionsHeading.parentElement as HTMLElement;

    // klik item 'Projects'
    const item = within(listContainer).getByText(/^Projects$/i);
    await userEvent.click(item);

    expect(pushMock).toHaveBeenCalledWith("#projects");
  });
});
