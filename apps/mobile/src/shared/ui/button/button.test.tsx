import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { Button, getButtonContainerStyle, getButtonTextStyle } from "./button";
import { buttonStyles } from "./button.styles";

interface IPressableHostProps {
  accessibilityRole?: string;
  accessibilityState?: {
    disabled?: boolean;
  };
}

describe("mobile Button", () => {
  it("renders variants, handles presses, and computes pressed styles", async () => {
    const handlePress = jest.fn();

    await render(
      <>
        <Button onPress={handlePress} testID="default-button">
          Default
        </Button>
        <Button size="icon" testID="primary-button" variant="primary">
          Primary
        </Button>
        <Button testID="ghost-button" variant="ghost">
          Ghost
        </Button>
      </>,
    );

    await fireEvent.press(screen.getByTestId("default-button"));

    const primaryStyles = getButtonContainerStyle({ isDisabled: false, isPressed: true, size: "icon", variant: "primary" });

    expect(handlePress).toHaveBeenCalledTimes(1);
    expect(primaryStyles).toEqual(expect.arrayContaining([buttonStyles.iconSize, buttonStyles.primary, buttonStyles.pressed]));
    expect(screen.getByText("Primary")).toBeTruthy();
    expect(screen.getByText("Ghost")).toBeTruthy();
  });

  it("applies disabled styles and falls back for unknown runtime variants", async () => {
    await render(
      <Button isDisabled testID="disabled-button" variant={"runtime-unknown" as never}>
        Disabled
      </Button>,
    );

    const disabledButtonProps = screen.getByTestId("disabled-button").props as IPressableHostProps;
    const disabledStyles = getButtonContainerStyle({ isDisabled: true, isPressed: false, size: "default", variant: "runtime-unknown" as never });

    expect(disabledStyles).toEqual(expect.arrayContaining([buttonStyles.defaultSize, buttonStyles.disabled, buttonStyles.secondary]));
    expect(getButtonTextStyle("runtime-unknown" as never)).toEqual([buttonStyles.text, buttonStyles.secondaryText]);
    expect(disabledButtonProps.accessibilityRole).toBe("button");
    expect(disabledButtonProps.accessibilityState?.disabled).toBe(true);
  });
});
