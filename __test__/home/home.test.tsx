import React from "react";
import { render } from "@testing-library/react-native";

import HomeScreen from "../../app/(tabs)/index";

describe("Behavior screen HomeScreen", () => {
  const setup = () => render(<HomeScreen />);

  it("should render text component", () => {
    const { getByText } = setup();

    const text = getByText("Nenhuma conta cadastrada");

    expect(text).toBeTruthy();
  });
});
