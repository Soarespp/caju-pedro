import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import { IconButton } from "~/components/Buttons/IconButton";
import Button from "~/components/Buttons";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import { useCadastroContext } from "~/Context";

import * as S from "./styles";
import { cpfMask } from "~/utils/formats";

export const SearchBar = () => {
  const history = useHistory();
  const { getDados, setFilter, filter } = useCadastroContext();

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        maxLength={14}
        value={filter}
        name="search"
        onChange={(event) => {
          setFilter(cpfMask(event.target.value));
        }}
        aria-label="Campo pesquisar por cpf"
      />
      <S.Actions>
        <IconButton aria-label="refetch">
          <HiRefresh
            onClick={() => getDados()}
            data-testid="btn-refresh"
            aria-label="Botão atualizar cards"
          />
        </IconButton>
        <Button
          data-testid="btn-newAdm"
          onClick={() => goToNewAdmissionPage()}
          aria-label="Botão nova admissão"
        >
          Nova Admissão
        </Button>
      </S.Actions>
    </S.Container>
  );
};
