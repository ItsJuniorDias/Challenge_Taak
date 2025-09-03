// __tests__/Header.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import Header, { HeaderProps } from "../../components/header";

describe("Header component", () => {
  const setup = ({ title, description, testID }: HeaderProps) =>
    render(<Header title={title} description={description} testID={testID} />);

  it("renders the title and description correctly", () => {
    const { getByText } = setup({
      testID: "header-id",
      title: "My Title",
      description: "My description",
    });

    expect(getByText("My Title")).toBeTruthy();
    expect(getByText("My description")).toBeTruthy();
  });

  it("applies the testID to the container", () => {
    const { getByTestId } = setup({
      title: "Test",
      description: "Description",
      testID: "header-container",
    });

    const container = getByTestId("header-container");
    expect(container).toBeTruthy();
  });

  it("uses the default testID when none is provided", () => {
    const { getByTestId } = setup({
      title: "Test",
      description: "Description",
      testID: "header_testID",
    });

    expect(getByTestId("header_testID")).toBeTruthy();
  });
});
