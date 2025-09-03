import React from "react";
import { render, fireEvent } from "@testing-library/react-native";

import Card, { CardComponentProps } from "../../components/card";

describe("Behavior component Card", () => {
  const mockOnPress = jest.fn();

  const props: CardComponentProps = {
    id: 0,
    title: "Teste",
    cnpj: "",
    contact: "",
    onPress: mockOnPress,
  };

  const setup = () => render(<Card {...props} />);

  it("should call function onPress", () => {
    const { getByTestId } = setup();

    const card = getByTestId("card_component_testID");

    expect(card).toBeTruthy();
  });
});
