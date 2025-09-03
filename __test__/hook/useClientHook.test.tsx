import { renderHook, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useClientHook from "../../hooks/useClientHook";
import { api } from "@/service/api";
import { v4 as uuidv4 } from "uuid";

// Mock the API module
jest.mock("@/service/api");
jest.mock("uuid");

const mockedApi = api as jest.Mocked<typeof api>;
const mockedUuid = uuidv4 as jest.Mock;

// React Query wrapper
function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // disable retries in tests (faster and avoids noise)
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useClientHook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch clients (query)", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [
        { id: "1", name: "Company X", cnpj: "123", contact: "99999-9999" },
      ],
    });

    const { result } = renderHook(() => useClientHook(), { wrapper });

    await waitFor(() => {
      expect(result.current.query.isSuccess).toBe(true);
    });

    expect(result.current.query.data).toEqual([
      { id: "1", name: "Company X", cnpj: "123", contact: "99999-9999" },
    ]);
  });

  it("should create a client (mutationCreate)", async () => {
    mockedUuid.mockReturnValue("mocked-uuid-123");

    mockedApi.post.mockResolvedValueOnce({
      data: {
        id: "mocked-uuid-123",
        name: "New Company",
        cnpj: "456",
        contact: "88888-8888",
      },
    });

    const { result } = renderHook(() => useClientHook(), { wrapper });

    await result.current.mutationCreate.mutateAsync({
      name: "New Company",
      cnpj: "456",
      contact: "88888-8888",
    });

    // Check if API was called with correct params
    expect(mockedApi.post).toHaveBeenCalledWith("/clients", {
      id: "mocked-uuid-123",
      name: "New Company",
      cnpj: "456",
      contact: "88888-8888",
    });

    // Check mutation status
    await waitFor(() =>
      expect(result.current.mutationCreate.isSuccess).toBe(true)
    );
  });

  it("should delete a client (mutationDelete)", async () => {
    mockedApi.delete.mockResolvedValueOnce({
      data: { success: true },
    });

    const { result } = renderHook(() => useClientHook(), { wrapper });

    await result.current.mutationDelete.mutateAsync("123");

    // ✅ Check if API was called with the correct endpoint
    expect(mockedApi.delete).toHaveBeenCalledWith("/clients/123");

    // ✅ Ensure mutation was successful
    await waitFor(() =>
      expect(result.current.mutationDelete.isSuccess).toBe(true)
    );
  });

  it("should edit a client (mutationEdit)", async () => {
    mockedApi.put.mockResolvedValueOnce({
      data: {
        id: "123",
        name: "Updated Company",
        cnpj: "987654",
        contact: "11111-1111",
      },
    });

    const { result } = renderHook(() => useClientHook(), { wrapper });

    await result.current.mutationEdit.mutateAsync({
      id: "123",
      name: "Updated Company",
      cnpj: "987654",
      contact: "11111-1111",
    });

    // ✅ Check if API was called with the right endpoint and body
    expect(mockedApi.put).toHaveBeenCalledWith("/clients/123", {
      id: "123",
      name: "Updated Company",
      cnpj: "987654",
      contact: "11111-1111",
    });

    // ✅ Ensure mutation succeeded
    await waitFor(() =>
      expect(result.current.mutationEdit.isSuccess).toBe(true)
    );
  });
});
