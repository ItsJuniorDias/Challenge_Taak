import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import ClientScreen from "../../app/(tabs)/clients";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const mockUseClientHook = jest.fn();

const mockData = [{ id: 1, name: "Cliente Teste" }];

jest.mock("@/hooks", () => ({
  useClientHook: jest.fn(() => ({
    query: {
      data: mockData,
    },
  })),
}));

mockUseClientHook.mockReturnValue({
  query: { data: mockData, isLoading: false, error: null },
  mutationCreate: jest.fn(),
  mutationDelete: jest.fn(),
  mutationEdit: jest.fn(),
});

describe("Behavior screen ClientScreen", () => {
  function renderWithClient(ui) {
    const queryClient = new QueryClient();

    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    );
  }

  it("should render text component", () => {
    const { getByText, debug } = renderWithClient(<ClientScreen />);

    debug();

    const text = getByText("Clientes");

    expect(text).toBeTruthy();
  });

  it("should render with mocked query", () => {
    const { getByText, getByTestId } = renderWithClient(<ClientScreen />);

    const text = getByText("Cliente Teste");

    const buttonCard = getByTestId("card_component_testID");

    fireEvent.press(buttonCard);

    expect(text).toBeTruthy();
  });

  it("should call function button float", () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithClient(
      <ClientScreen />
    );

    const buttonCard = getByTestId("float_button_testID");

    fireEvent.press(buttonCard);

    const button = getByTestId("button_safe_testID");

    console.log(button.props, "PROPS");

    fireEvent.press(button);

    expect(button).toBeTruthy();
  });
});
