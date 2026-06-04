type TClassNameValue = false | null | string | undefined;

export const classNames = (...values: TClassNameValue[]): string => values.filter((value): value is string => Boolean(value)).join(" ");
