import React from "react";
import { render } from "@testing-library/react-native";

import ContactScreen from "../../app/(tabs)/contact";

describe("Behavior screen ContactScreen", () => {
  const setup = () => render(<ContactScreen />);

  it("should render text component", () => {
    const { getByText } = setup();

    const text = getByText("Contas cadastradas");

    expect(text).toBeTruthy();
  });
});
