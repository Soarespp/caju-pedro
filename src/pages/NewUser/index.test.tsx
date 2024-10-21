import NewUserPage from ".";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("react-router-dom", () => ({
  // useHistory: jest.fn(() => ({ history: { push: jest.fn() } })),
  useHistory: jest.fn(() => ({ push: jest.fn() })),
}));

const mockCadastrar = jest.fn();

jest.mock("~/Context", () => ({
  ...jest.requireActual("~/Context"),
  useCadastroContext: jest.fn(() => ({
    handleAddRegistration: mockCadastrar,
  })),
}));

describe("NewUserPage", () => {
  it("Should render componet", () => {
    renderComponent();
    expect(screen.getByTestId("page-newuser"));
  });

  it("Render errors", async () => {
    renderComponent();

    const iptNome = screen.getByTestId("inpt-nome");
    fireEvent.blur(iptNome);
    fireEvent.change(iptNome, { target: { value: "P" } });
    expect(await screen.findByText("Nome precisar ter sobrenome"));

    fireEvent.blur(iptNome);
    fireEvent.change(iptNome, { target: { value: "1" } });
    expect(await screen.findByText("Não é permitido iniciar com numero"));

    const iptEmail = screen.getByTestId("inpt-email");
    fireEvent.blur(iptEmail);
    fireEvent.change(iptEmail, { target: { value: "P" } });
    expect(await screen.findByText("Não e um e-mail valido"));

    fireEvent.blur(iptNome);
    fireEvent.change(iptNome, { target: { value: "P    " } });
    expect(await screen.findByText("Nome maior que 2 letras"));

    expect(screen.getByText(/Cadastrar/i).closest("button")).toHaveProperty(
      "disabled"
    );
  });

  it("Render change all values", async () => {
    renderComponent();

    const iptNome = screen.getByTestId("inpt-nome");
    fireEvent.blur(iptNome);
    fireEvent.change(iptNome, { target: { value: "Pedro Soares" } });

    const iptEmail = screen.getByTestId("inpt-email");
    fireEvent.blur(iptEmail);
    fireEvent.change(iptEmail, { target: { value: "pedro@gmail.com" } });

    const iptCPF = screen.getByTestId("inpt-cpf");
    fireEvent.blur(iptCPF);
    fireEvent.change(iptCPF, { target: { value: "434.169.310-76" } });

    const iptDtAdm = screen.getByTestId("inpt-dtAdm");
    fireEvent.blur(iptDtAdm);
    fireEvent.change(iptDtAdm, { target: { value: "2024-10-20" } });

    await waitFor(() => {
      expect(screen.queryByText("Nome precisar ter sobrenome")).toBeNull();
      expect(screen.queryByText("Não e um e-mail valido")).toBeNull();
      expect(
        screen.queryByText("Não é permitido iniciar com numero")
      ).toBeNull();
    });

    const btnCadastrar = screen.getByTestId("btn-cadastar-user");
    fireEvent.click(btnCadastrar);
    await waitFor(() => expect(mockCadastrar).toHaveBeenCalled());
  });

  it("Call return page", async () => {
    renderComponent();

    const btnBack = screen.getByTestId("btn-back-cadastro");
    fireEvent.click(btnBack);

    await waitFor(() => expect(mockCadastrar).toHaveBeenCalled());
  });
});

const renderComponent = () => {
  return render(<NewUserPage />);
};
