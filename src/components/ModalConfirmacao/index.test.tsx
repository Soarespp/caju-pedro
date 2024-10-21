import ModalConfirmation from ".";

import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

let mockStatos = "REVIEW";
const mockChangeModal = jest.fn();
const mockHandleStatus = jest.fn();
jest.mock("~/Context", () => ({
  ...jest.requireActual("~/Context"),
  useCadastroContext: jest.fn(() => ({
    modalQuestion: { status: mockStatos, open: true, data: {} },
    handleChangeStatus: mockHandleStatus,
    changeModal: mockChangeModal,
  })),
}));

describe("<SearchBar />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component", () => {
    render(<ModalConfirmation />);
    expect(screen.getByText("Deseja confirmar o evento?"));
  });

  it("Should render component APROVED", () => {
    mockStatos = "APPROVED";
    render(<ModalConfirmation />);
    expect(screen.getByText("Desejar passar o card para Aprovado"));
  });

  it("Should render component REPROVED", () => {
    mockStatos = "REPROVED";

    render(<ModalConfirmation />);
    expect(screen.getByText("Desejar passar o card para Reprovado"));
  });

  it("Should cancel modal", () => {
    render(<ModalConfirmation />);
    const btnCancel = screen.getByTestId("btn-cance-modal");
    fireEvent.click(btnCancel);
    expect(mockChangeModal).toHaveBeenCalled();
  });

  it("Should cancel modal", () => {
    render(<ModalConfirmation />);
    const btnCancel = screen.getByTestId("btn-confirm-modal");
    fireEvent.click(btnCancel);
    expect(mockHandleStatus).toHaveBeenCalled();
  });
});
