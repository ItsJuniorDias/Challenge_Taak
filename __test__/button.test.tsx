import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Button, { ButtonComponentProps } from "../components/button";

describe("Behavior component Button", () => {
  const mockOnPress = jest.fn();

  const props: ButtonComponentProps = {
    testID: "button_testID",
    title: "Teste",
    backgroundColor: "#52be80",
    colorText: "#FFFFFF",
    onPress: mockOnPress,
  };

  const setup = () => render(<Button {...props} />);

  it("should call function onPress", () => {
    const { getByTestId } = setup();

    const button = getByTestId("button_testID");

    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalled();
  });
});
