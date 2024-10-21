import { fireEvent, render, screen } from "@testing-library/react";
import RegistrationCard from ".";

let mockChangModal = jest.fn();
let mockDeleteCard = jest.fn();

let mockData = {
  admissionDate: "22/10/2023",
  email: "filipe@caju.com.br",
  employeeName: "Pedro register",
  status: "REVIEW",
  cpf: "78502270001",
  id: "0d02",
};

describe("Button", () => {
  it("Should render component", () => {
    renderComponent();
    expect(screen.getByText("Pedro register"));
  });

  it("Should click buttons reproved", () => {
    renderComponent();
    const btnReview = screen.getByTestId("btn-reprove");
    fireEvent.click(btnReview);

    expect(mockChangModal).toHaveBeenCalledWith("REPROVED", {
      admissionDate: "22/10/2023",
      cpf: "78502270001",
      email: "filipe@caju.com.br",
      employeeName: "Pedro register",
      id: "0d02",
      status: "REVIEW",
    });
  });

  it("Should click buttons aproved", () => {
    renderComponent();
    const btnReview = screen.getByTestId("btn-approved");
    fireEvent.click(btnReview);

    expect(mockChangModal).toHaveBeenCalledWith("REPROVED", {
      admissionDate: "22/10/2023",
      cpf: "78502270001",
      email: "filipe@caju.com.br",
      employeeName: "Pedro register",
      id: "0d02",
      status: "REVIEW",
    });
  });

  it("Should click buttons review", () => {
    renderComponent("APPROVED");
    const btnReview = screen.getByTestId("btn-review");
    fireEvent.click(btnReview);

    expect(mockChangModal).toHaveBeenCalledWith("APPROVED", {
      admissionDate: "22/10/2023",
      cpf: "78502270001",
      email: "filipe@caju.com.br",
      employeeName: "Pedro register",
      id: "0d02",
      status: "REVIEW",
    });
  });

  it("Should click buttons delete", () => {
    renderComponent();
    const btnReview = screen.getByTestId("btn-delete-card");
    fireEvent.click(btnReview);

    expect(mockDeleteCard).toHaveBeenCalled();
  });
});

const renderComponent = (status = "REVIEW") => {
  return render(
    <RegistrationCard
      data={{ ...mockData, status }}
      deleteCard={mockDeleteCard}
      changeModal={mockChangModal}
    />
  );
};
