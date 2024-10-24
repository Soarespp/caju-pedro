import { CadastroProvider, useCadastroContext } from "./useCadastroContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

const mockData = jest.fn(() => [
  {
    admissionDate: "22/10/2023",
    email: "filipe@caju.com.br",
    employeeName: "Filipe Marins",
    status: "REVIEW",
    cpf: "78502270001",
    id: "3",
  },
]);

jest.mock("axios", () => ({
  __esModule: true,
  get: jest.fn(() =>
    Promise.resolve({
      data: mockData(),
    })
  ),
  default: jest.fn(() => Promise.resolve({ data: mockData })),
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
    await waitFor(() => expect(mockData).toHaveBeenCalled());
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
