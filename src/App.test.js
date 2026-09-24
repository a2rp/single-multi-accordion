import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("opens one answer by default", () => {
    render(<App />);
    const firstQuestion = screen.getByRole("button", { name: /what is the universe made of/i });
    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(firstQuestion);
    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
});

test("can switch to multi-open mode", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("checkbox", { name: /enable multi-open mode/i }));
    expect(screen.getByText("Multi-open mode")).toBeInTheDocument();
});