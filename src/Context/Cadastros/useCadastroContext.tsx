import { createContext, useContext, useEffect, useState } from "react";
import useDadosDashboard from "~/hooks/useDadosDashboard";
import { removerCaractersCPF, validarCPF } from "~/utils/formats";
import { modalAvisoType, RegistrationType, UserType } from "~/utils/types";

type CadastroProviderProps = {
  children: React.ReactNode;
};

type modalConfirmationType = {
  open: boolean;
  data?: RegistrationType;
  status?: string;
};

type CadastroContextData = {
  registrations: RegistrationType[];
  loading: boolean;
  filter: string;
  modalQuestion: modalConfirmationType;
  error: string;
  modalAviso: modalAvisoType;
  changeModal: (status?: string, data?: any) => void;
  setFilter: (param: string) => void;
  fetchDados: () => void;
  handleChangeStatus: (status: string, data: RegistrationType) => void;
  handleDelete: (id: string) => void;
  getDados: () => void;
  handleAddRegistration: (dados: UserType) => void;
  changeModalAviso: (msg?: string) => void;
};

export const CadastroContext = createContext({} as CadastroContextData);

export const CadastroProvider = ({ children }: CadastroProviderProps) => {
  const [filter, setFilter] = useState<string>("");
  const [modalQuestion, setModalQuestion] = useState<modalConfirmationType>({
    open: false,
  });

  const [modalAviso, setModalAviso] = useState<modalAvisoType>({
    open: false,
  });
  const [error, setError] = useState<string>("");

  const changeModalAviso = (msg?: string) => {
    setModalAviso((old) => ({ open: !old.open, msg }));
  };

  const {
    registrations,
    loading,
    fetchDados,
    changeSatus,
    deleteCard,
    addRegistration,
  } = useDadosDashboard({ setError, changeModalAviso });

  const getDados = (filter?: string) => {
    fetchDados(filter);
  };

  const handleChangeStatus = (status: string, data: RegistrationType) => {
    changeSatus(status, data, filter);
  };

  const handleDelete = (id: string) => {
    deleteCard(id).then((res: any) => {
      if (res === 200) {
        changeModalAviso("Excluido card com sucesso");

        getDados();
      }
    });
  };

  const changeModal = (status?: string, data?: any) => {
    setModalQuestion((old) => ({ open: !old.open, data, status }));
  };

  useEffect(() => {
    if (validarCPF(filter) || !filter) {
      getDados(removerCaractersCPF(filter));
    }
  }, [filter]);

  const handleAddRegistration = (dadosParam: UserType) => {
    const dataFormat = {
      ...dadosParam,
      cpf: removerCaractersCPF(dadosParam.cpf),
    };
    addRegistration(dataFormat);
  };

  const valueProvider: CadastroContextData = {
    registrations,
    loading,
    filter,
    modalQuestion,
    error,
    modalAviso,
    changeModal,
    setFilter,
    fetchDados,
    handleChangeStatus,
    handleDelete,
    getDados,
    handleAddRegistration,
    changeModalAviso,
  };

  return (
    <CadastroContext.Provider value={valueProvider}>
      {children}
    </CadastroContext.Provider>
  );
};

export const useCadastroContext = () => useContext(CadastroContext);
