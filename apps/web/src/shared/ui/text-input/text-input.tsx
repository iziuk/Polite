import { classNames } from "@shared/lib/class-names";

type TTextInputProps = React.JSX.IntrinsicElements["input"];

const TEXT_INPUT_CLASS_NAME =
  "w-full rounded-xl border border-gray-200 px-4 py-2 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

export const TextInput = (({ className, type = "text", ...props }: TTextInputProps): React.ReactElement => (
  <input className={classNames(TEXT_INPUT_CLASS_NAME, className)} type={type} {...props} />
)) satisfies React.FC<TTextInputProps>;
