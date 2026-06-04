import { classNames } from "@shared/lib/class-names";

type TButtonVariant = "ghost" | "primary" | "secondary";
type TButtonSize = "icon" | "md" | "sm";
type TButtonNativeProps = React.JSX.IntrinsicElements["button"];

interface IButtonProps extends TButtonNativeProps {
  size?: TButtonSize;
  variant?: TButtonVariant;
}

const BUTTON_BASE_CLASS_NAME =
  "inline-flex items-center justify-center gap-1.5 border font-medium transition focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60";

const BUTTON_SIZE_CLASS_NAMES: Record<TButtonSize, string> = {
  icon: "min-h-8 min-w-8 rounded-lg px-2 py-1 text-base",
  md: "min-h-10 rounded-xl px-4 py-2 text-sm",
  sm: "min-h-8 rounded-lg px-2 py-1 text-sm",
};

const BUTTON_VARIANT_CLASS_NAMES: Record<TButtonVariant, string> = {
  ghost: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
  primary: "border-indigo-600 bg-indigo-600 text-white hover:bg-indigo-700",
  secondary: "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
};

export const Button = (({ className, size = "md", type = "button", variant = "secondary", ...props }: IButtonProps): React.ReactElement => (
  <button
    className={classNames(BUTTON_BASE_CLASS_NAME, BUTTON_SIZE_CLASS_NAMES[size], BUTTON_VARIANT_CLASS_NAMES[variant], className)}
    type={type}
    {...props}
  />
)) satisfies React.FC<IButtonProps>;
