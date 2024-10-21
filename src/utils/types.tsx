export type RegistrationType = {
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
  status?: string;
  id?: string;
};

export type UserType = {
  employeeName: string;
  email: string;
  cpf: string;
  admissionDate: string;
};

export type modalAvisoType = {
  open: boolean;
  msg?: string;
};
