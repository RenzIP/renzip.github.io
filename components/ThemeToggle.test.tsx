import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "./ThemeToggle";

// mock next-themes agar kita bisa cek setTheme dipanggil
const setThemeMock = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "light", setTheme: setThemeMock }),
}));

describe("<ThemeToggle />", () => {
  it("klik tombol memanggil setTheme('dark') saat tema sekarang light", async () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /toggle theme/i });
    await userEvent.click(btn);
    expect(setThemeMock).toHaveBeenCalledWith("dark");
  });
});
