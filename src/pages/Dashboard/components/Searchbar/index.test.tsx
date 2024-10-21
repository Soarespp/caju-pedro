import { SearchBar } from ".";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const mockGetDados = jest.fn();
const mockPush = jest.fn();
const mockSetFilter = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({ push: mockPush })),
}));

jest.mock("~/Context", () => ({
  ...jest.requireActual("~/Context"),
  useCadastroContext: jest.fn(() => ({
    getDados: mockGetDados,
    setFilter: mockSetFilter,
    filter: "",
  })),
}));

describe("<SearchBar />", () => {
  it("Should show button", async () => {
    render(<SearchBar />);
    const btnNew = screen.getByTestId("btn-refresh");
    fireEvent.click(btnNew);
    await waitFor(() => expect(mockGetDados).toHaveBeenCalled());
  });

  it("Should  click new AdmissionPage", async () => {
    render(<SearchBar />);
    const btnNew = screen.getByTestId("btn-newAdm");
    fireEvent.click(btnNew);
    await waitFor(() => expect(mockPush).toHaveBeenCalled());
  });

  it("Should  filter search", async () => {
    render(<SearchBar />);
    const iptSearch = screen.getByTestId("inpt-search");
    fireEvent.change(iptSearch, { target: { value: "P" } });

    await waitFor(() => expect(mockSetFilter).toHaveBeenCalled());
  });
});
