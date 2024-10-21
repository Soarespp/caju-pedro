import { CadastroProvider, useCadastroContext } from "./useCadastroContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

const mockCadastrar = jest.fn();

jest.mock("~/Context", () => ({
  ...jest.requireActual("~/Context"),
  useCadastroContext: jest.fn(() => ({
    addRegistration: mockCadastrar,
  })),
}));

describe("NewUserPage", () => {
  it("Should changeModal", () => {
    renderComponent();
    fireEvent.click(screen.getByText("changeModal"));
    expect(screen.getByText("Pedro teste 1"));
  });

  it("Should filtert", () => {
    renderComponent();
    fireEvent.click(screen.getByText("setFilter"));
    expect(screen.getByText("785.022.700-01"));
  });

  it("Should handleChangeStatus", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("handleChangeStatus"));
    expect(await screen.findByText("Movido o card para REPROVED com sucesso."));
  });
});

const RenderFakeComponent = () => {
  const {
    changeModal,
    modalQuestion,
    setFilter,
    filter,
    modalAviso,
    handleChangeStatus,
    handleDelete,
  } = useCadastroContext();
  return (
    <div>
      {modalAviso.open && <p data-testid="msg-sucesso">{modalAviso.msg}</p>}
      <p data-testid="p-employeeName">{modalQuestion.data?.employeeName}</p>
      <p data-testid="p-filter">{filter}</p>
      <button
        onClick={() =>
          changeModal("REPROVED", {
            admissionDate: "22/10/2023",
            email: "filipe@caju.com.br",
            employeeName: "Pedro teste 1",
            status: "REPROVED",
            cpf: "78502270001",
            id: "3f4f",
          })
        }
      >
        changeModal
      </button>
      <button onClick={() => setFilter("785.022.700-01")}>setFilter</button>
      <button
        onClick={() =>
          handleChangeStatus("REPROVED", {
            admissionDate: "22/10/2023",
            email: "filipe@caju.com.br",
            employeeName: "Pedro teste 2",
            status: "REPROVED",
            cpf: "78502270001",
            id: "3f4f",
          })
        }
      >
        handleChangeStatus
      </button>

      <button onClick={() => handleDelete("1")}>handleDelete</button>
    </div>
  );
};
const renderComponent = () => {
  return render(
    <CadastroProvider>
      <RenderFakeComponent />
    </CadastroProvider>
  );
};
