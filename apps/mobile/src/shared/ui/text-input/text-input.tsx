import { type FC } from "react";
import { TextInput as NativeTextInput, type TextInputProps } from "react-native";

import { colors } from "@shared/config";

import { textInputStyles } from "./text-input.styles";

export const TextInput: FC<TextInputProps> = ({ placeholderTextColor = colors.muted, style, ...props }) => (
  <NativeTextInput placeholderTextColor={placeholderTextColor} style={[textInputStyles.input, style]} {...props} />
);
