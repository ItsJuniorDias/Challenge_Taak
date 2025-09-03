import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import InputComponent from "../../components/input";

describe("Behavior component InputComponent", () => {
  it("renders with placeholder and value", () => {
    const { getByPlaceholderText } = render(
      <InputComponent
        placeholder="Enter your name"
        value="John"
        onChangeText={() => {}}
        error={undefined}
      />
    );

    const input = getByPlaceholderText("Enter your name");
    expect(input.props.value).toBe("John");
  });

  it("calls onChangeText when typing", () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <InputComponent
        placeholder="Enter your email"
        value=""
        onChangeText={handleChange}
        error={undefined}
      />
    );

    const input = getByPlaceholderText("Enter your email");
    fireEvent.changeText(input, "test@example.com");

    expect(handleChange).toHaveBeenCalledWith("test@example.com");
  });

  it("renders error message when error is provided", () => {
    const { getByText } = render(
      <InputComponent
        placeholder="Enter your password"
        value=""
        onChangeText={() => {}}
        error="Password is required"
      />
    );

    expect(getByText("Password is required")).toBeTruthy();
  });

  it("does not render error message when error is undefined", () => {
    const { queryByText } = render(
      <InputComponent
        placeholder="Enter your password"
        value=""
        onChangeText={() => {}}
        error={undefined}
      />
    );

    expect(queryByText("Password is required")).toBeNull();
  });
});
