import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react-native";

import { App } from "./app";

describe("App", () => {
  it("renders the localized phrase browser inside providers", async () => {
    await render(<App />);

    expect(screen.getByText("Polite — розмовні пакети")).toBeTruthy();
  });
});
