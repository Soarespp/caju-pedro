import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ModalMessage from ".";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

let mockMsg = "Confirmado com sucesso";
const mockConfirme = jest.fn();
jest.mock("~/Context", () => ({
  ...jest.requireActual("~/Context"),
  useCadastroContext: jest.fn(() => ({
    modalAviso: { open: true, msg: mockMsg },
    changeModalAviso: mockConfirme,
  })),
}));

describe("<SearchBar />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component", () => {
    render(<ModalMessage />);
    expect(screen.getByText("Confirmado com sucesso"));
  });

  it("Should click confirm", async () => {
    render(<ModalMessage />);
    const btnConfirme = screen.getByTestId("btn-ok-msg");
    fireEvent.click(btnConfirme);
    await waitFor(() => expect(mockConfirme).toHaveBeenCalled());
  });
});
