import { useEffect, useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import TextField from "~/components/TextField";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";

import { cpfMask, validarCPF } from "~/utils/formats";
import { UserType } from "~/utils/types";
import { useCadastroContext } from "~/Context";

import * as S from "./styles";

const NewUserPage = () => {
  const { handleAddRegistration } = useCadastroContext();
  const history = useHistory();
  const [validate, setValidate] = useState(false);

  const [cadastroUser, setCadastroUser] = useState<UserType>({
    employeeName: "",
    email: "",
    cpf: "",
    admissionDate: "",
  });

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const handleChange = (field: string, value: string) => {
    setCadastroUser((old: UserType) => ({ ...old, [field]: value }));
  };

  const handleSubmite = () => {
    handleAddRegistration(cadastroUser);
    goToHome();
  };

  const validateItem = (field: string) => {
    if (field === "employeeName") {
      if (!cadastroUser[field]) {
        return;
      }

      if (Number(cadastroUser[field][0])) {
        return "Não é permitido iniciar com numero";
      }

      const posEspcao = cadastroUser[field].indexOf(" ");
      if (posEspcao === -1) {
        return "Nome precisar ter sobrenome";
      }

      if (
        cadastroUser[field].substring(0, posEspcao).trim.length === 0 &&
        cadastroUser[field]
          .substring(posEspcao + 1, cadastroUser[field].length)
          .trim().length === 0
      ) {
        return "Nome maior que 2 letras";
      }
    }

    if (field === "email") {
      if (!cadastroUser[field]) {
        return;
      }
      const valEmail = cadastroUser[field].indexOf("@");
      if (valEmail === -1) {
        return "Não e um e-mail valido";
      }
    }

    if (field === "cpf") {
      if (!cadastroUser[field]) {
        return;
      }
      if (!validarCPF(cadastroUser[field])) {
        return "CPF invalido";
      }
    }
  };

  useEffect(() => {
    const valNome = validateItem("employeeName");
    const valEmail = validateItem("email");
    const validaCP = validateItem("cpf");

    setValidate(!valNome && !valEmail && !validaCP);
  }, [cadastroUser]);

  return (
    <form onSubmit={handleSubmite}>
      <S.Container data-testid="page-newuser">
        <S.Card>
          <IconButton
            data-testid="btn-back-cadastro"
            onClick={() => goToHome()}
            aria-label="Voltar para home"
          >
            <HiOutlineArrowLeft size={24} />
          </IconButton>
          <TextField
            placeholder="Nome"
            label="Nome *"
            type="text"
            name="nome"
            value={cadastroUser.employeeName}
            onChange={(event) =>
              handleChange("employeeName", event.target.value)
            }
            error={validateItem("employeeName")}
          />
          <TextField
            placeholder="Email"
            label="Email *"
            type="email"
            name="email"
            value={cadastroUser.email}
            onChange={(event) => handleChange("email", event.target.value)}
            error={validateItem("email")}
          />
          <TextField
            placeholder="CPF"
            label="CPF"
            value={cadastroUser.cpf}
            name="cpf"
            maxLength={14}
            onChange={(event) =>
              handleChange("cpf", cpfMask(event.target.value))
            }
            error={validateItem("cpf")}
          />
          <TextField
            label="Data de admissão"
            type="date"
            name="dtAdm"
            max={14}
            value={cadastroUser.admissionDate}
            onChange={(event) =>
              handleChange("admissionDate", event.target.value)
            }
          />
          <Button
            data-testid="btn-cadastar-user"
            disabled={!validate}
            aria-label="Botão para cadastrar usuário"
          >
            Cadastrar
          </Button>
        </S.Card>
      </S.Container>
    </form>
  );
};

export default NewUserPage;
