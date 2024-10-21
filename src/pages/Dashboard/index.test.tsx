import DashboardPage from ".";
import { render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

let mockLoading = false;

jest.mock("~/Context", () => ({
  ...jest.requireActual("~/Context"),
  useCadastroContext: jest.fn(() => ({
    loading: mockLoading,
    getDados: jest.fn(),
  })),
}));

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should show button", () => {
    render(<DashboardPage />);
    expect(screen.getByText("Nova Admissão"));
  });

  it("Should show loading", () => {
    mockLoading = true;
    render(<DashboardPage />);
    expect(screen.getByText("loading..."));
  });
});
