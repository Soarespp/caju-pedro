import axios from "axios";
import { useState } from "react";
import { RegistrationType, UserType } from "~/utils/types";

const URL_CONECTION = "http://localhost:3000/registrations";

type propsType = {
  setError: (param: string) => void;
  changeModalAviso: (msg: string) => void;
};

const useDadosDashboard = ({ setError, changeModalAviso }: propsType) => {
  const [registrations, setRegistrations] = useState<RegistrationType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDados = (filter?: string) => {
    let filterParams = "";
    if (filter) {
      filterParams = `?cpf=${filter.replace(/[^\d]+/g, "")}`;
    }

    setLoading(true);

    axios(`${URL_CONECTION}${filterParams}`, {
      method: "GET",
    })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        setRegistrations(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const changeSatus = (
    status: string,
    data: RegistrationType,
    filter?: string
  ) => {
    axios(`${URL_CONECTION}/${data.id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      data: { ...data, status },
    })
      .then((res) => {
        if (res.status === 200) {
          changeModalAviso(`Movido o card para ${status} com sucesso. `);
          fetchDados(filter);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const deleteCard = async (id: string) => {
    return await axios(`${URL_CONECTION}/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          changeModalAviso(`Card excluido com sucesso`);

          fetchDados();
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const addRegistration = async (dados: UserType) => {
    axios("http://localhost:3000/registrations", {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      data: {
        ...dados,
        status: "REVIEW",
      },
    }).then((res) => {
      if (res.status === 201) {
        changeModalAviso(`Card criado com sucesso`);
      }
    });
  };

  return {
    registrations,
    loading,
    fetchDados,
    changeSatus,
    deleteCard,
    addRegistration,
  };
};

export default useDadosDashboard;
