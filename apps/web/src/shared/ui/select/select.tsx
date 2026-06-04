import { classNames } from "@shared/lib/class-names";

type TSelectProps = React.JSX.IntrinsicElements["select"];

const SELECT_CLASS_NAME =
  "h-10 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500";

export const Select = (({ className, ...props }: TSelectProps): React.ReactElement => (
  <select className={classNames(SELECT_CLASS_NAME, className)} {...props} />
)) satisfies React.FC<TSelectProps>;
