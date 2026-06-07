import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { classNames } from "@shared/lib/class-names";

import { Button, Select, TextInput } from ".";

describe("web shared UI", () => {
  it("joins class names and removes empty values", () => {
    expect(classNames("base", false, null, undefined, "active")).toBe("base active");
  });

  it("renders buttons with default and explicit variants, sizes, and type", () => {
    const handleClick = vi.fn();

    render(
      <div>
        <Button onClick={handleClick}>Default</Button>
        <Button size="icon" variant="primary">
          Icon
        </Button>
        <Button size="sm" type="submit" variant="ghost">
          Submit
        </Button>
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Default" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Default" })).toHaveAttribute("type", "button");
    expect(screen.getByRole("button", { name: "Icon" }).className).toContain("min-w-8");
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute("type", "submit");
  });

  it("renders select and text input wrappers", () => {
    const handleChange = vi.fn();

    render(
      <div>
        <Select aria-label="Language" className="custom-select" onChange={handleChange} value="uk">
          <option value="uk">Українська</option>
          <option value="en">English</option>
        </Select>
        <TextInput aria-label="Search" className="custom-input" onChange={handleChange} value="" />
      </div>,
    );

    fireEvent.change(screen.getByLabelText("Language"), { target: { value: "en" } });
    fireEvent.change(screen.getByLabelText("Search"), { target: { value: "term" } });

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(screen.getByLabelText("Language").className).toContain("custom-select");
    expect(screen.getByLabelText("Search")).toHaveAttribute("type", "text");
  });
});
