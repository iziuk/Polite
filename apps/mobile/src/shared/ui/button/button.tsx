import { type FC, type ReactNode } from "react";
import { Pressable, Text, type GestureResponderEvent, type StyleProp, type TextStyle, type ViewStyle } from "react-native";

import { buttonStyles } from "./button.styles";

type TButtonSize = "default" | "icon";
type TButtonVariant = "ghost" | "primary" | "secondary";

interface IButtonProps {
  accessibilityLabel?: string;
  children: ReactNode;
  isDisabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  size?: TButtonSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  variant?: TButtonVariant;
}

interface IButtonContainerStyleOptions {
  isDisabled: boolean;
  isPressed: boolean;
  size: TButtonSize;
  style?: StyleProp<ViewStyle>;
  variant: TButtonVariant;
}

const getVariantStyle = (variant: TButtonVariant): ViewStyle => {
  switch (variant) {
    case "ghost":
      return buttonStyles.ghost;
    case "primary":
      return buttonStyles.primary;
    case "secondary":
      return buttonStyles.secondary;
    default:
      return buttonStyles.secondary;
  }
};

const getTextVariantStyle = (variant: TButtonVariant): TextStyle => {
  switch (variant) {
    case "ghost":
      return buttonStyles.ghostText;
    case "primary":
      return buttonStyles.primaryText;
    case "secondary":
      return buttonStyles.secondaryText;
    default:
      return buttonStyles.secondaryText;
  }
};

export const getButtonContainerStyle = ({ isDisabled, isPressed, size, style, variant }: IButtonContainerStyleOptions): StyleProp<ViewStyle> => [
  buttonStyles.base,
  getVariantStyle(variant),
  size === "icon" ? buttonStyles.iconSize : buttonStyles.defaultSize,
  isPressed ? buttonStyles.pressed : null,
  isDisabled ? buttonStyles.disabled : null,
  style,
];

export const getButtonTextStyle = (variant: TButtonVariant): StyleProp<TextStyle> => [buttonStyles.text, getTextVariantStyle(variant)];

export const Button: FC<IButtonProps> = ({
  accessibilityLabel,
  children,
  isDisabled = false,
  onPress,
  size = "default",
  style,
  testID,
  variant = "secondary",
}) => (
  <Pressable
    accessibilityLabel={accessibilityLabel}
    accessibilityRole="button"
    disabled={isDisabled}
    onPress={onPress}
    style={({ pressed }) => getButtonContainerStyle({ isDisabled, isPressed: pressed, size, style, variant })}
    testID={testID}>
    <Text style={getButtonTextStyle(variant)}>{children}</Text>
  </Pressable>
);
