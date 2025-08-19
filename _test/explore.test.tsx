import React from "react";
import { render } from "@testing-library/react-native";

import ExploreScreen from "../app/(tabs)/explore";

describe("Behavior screen ExploreScreen", () => {
  const setup = () => render(<ExploreScreen />);

  it("should render text component", () => {
    const { getByText } = setup();

    const text = getByText("Screen Explore");

    expect(text).toBeTruthy();
  });
});
