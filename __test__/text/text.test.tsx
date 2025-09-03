import React from "react";
import { render } from "@testing-library/react-native";

import Text, { TextComponentProps } from "../../components/text";

describe("Behavior component Text", () => {
  const props: TextComponentProps = {
    testID: "text_testID",
    title: "Test",
    fontFamily: "regular",
    fontSize: 24,
    color: "#3333",
  };

  const setup = () => render(<Text {...props} />);

  it("should render text component", () => {
    const { getByTestId } = setup();

    const text = getByTestId("text_testID");

    expect(text).toBeTruthy();
  });
});
