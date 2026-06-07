import { jest } from "@jest/globals";

jest.mock("react-native-safe-area-context", () => {
  const safeAreaContextMock = jest.requireActual<{ default: unknown }>("react-native-safe-area-context/jest/mock").default;

  return safeAreaContextMock;
});
