import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import OnboardingScreen from "./index";

const mockOnPress = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: mockOnPress,
  })),
}));

describe("Behavior screen OnboardingScreen", () => {
  const setup = () => render(<OnboardingScreen />);

  it("should render text component", () => {
    const { getByText } = setup();

    const text = getByText("Onboarding Screen");

    expect(text).toBeTruthy();
  });

  it("should call function onPress", () => {
    const { getByTestId } = setup();

    const button = getByTestId("button_testID");

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
