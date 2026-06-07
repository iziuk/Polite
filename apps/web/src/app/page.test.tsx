import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Page from "./page";

vi.mock("@widgets/phrase-browser", () => ({
  PhraseBrowser: () => <div>Phrase browser</div>,
}));

describe("Page", () => {
  it("renders the phrase browser widget", () => {
    render(<Page />);

    expect(screen.getByText("Phrase browser")).toBeInTheDocument();
  });
});
