import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { colors } from "@shared/config";

import { TextInput } from "./text-input";

describe("mobile TextInput", () => {
  it("uses the default placeholder color and forwards text changes", async () => {
    const handleChangeText = jest.fn();

    await render(<TextInput onChangeText={handleChangeText} placeholder="Search" testID="search-input" value="" />);

    await fireEvent.changeText(screen.getByTestId("search-input"), "diagnostics");

    expect(handleChangeText).toHaveBeenCalledWith("diagnostics");
    expect(screen.getByTestId("search-input").props.placeholderTextColor).toBe(colors.muted);
  });

  it("allows overriding placeholder color and style", async () => {
    await render(<TextInput placeholderTextColor="#000000" style={{ marginTop: 12 }} testID="custom-input" value="" />);

    expect(screen.getByTestId("custom-input").props.placeholderTextColor).toBe("#000000");
    expect(screen.getByTestId("custom-input").props.style).toEqual(expect.arrayContaining([expect.objectContaining({ marginTop: 12 })]));
  });
});
