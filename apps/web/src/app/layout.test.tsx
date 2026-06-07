import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import RootLayout, { generateMetadata } from "./layout";

vi.mock("next-intl", () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="intl-provider">{children}</div>,
}));

vi.mock("next-intl/server", () => ({
  getLocale: vi.fn().mockResolvedValue("uk"),
  getTranslations: vi.fn().mockResolvedValue((key: string) => `translated:${key}`),
}));

describe("RootLayout", () => {
  it("generates localized metadata", async () => {
    await expect(generateMetadata()).resolves.toMatchObject({
      description: "translated:app.metadata.description",
      openGraph: {
        description: "translated:app.metadata.open-graph-description",
        title: "translated:app.metadata.title",
      },
      title: "translated:app.metadata.title",
    });
  });

  it("returns localized document structure with the intl provider", async () => {
    const htmlElement = (await RootLayout({ children: <main>Content</main> })) as any;
    const bodyElement = htmlElement.props.children.find((child: any) => child.type === "body");

    expect(htmlElement.props.lang).toBe("uk");
    render(bodyElement.props.children);
    expect(screen.getByTestId("intl-provider")).toContainElement(screen.getByText("Content"));
  });
});
