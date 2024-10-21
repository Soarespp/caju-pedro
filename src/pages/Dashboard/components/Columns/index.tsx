import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { useCadastroContext } from "~/Context";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

const Collumns = () => {
  const { registrations, changeModal, handleDelete } = useCadastroContext();
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn
                status={collum.status}
                aria-label={`Coluna de ${collum.title}`}
              >
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations
                  ?.filter((item) => item.status === collum.status)
                  ?.map((registration) => {
                    return (
                      <RegistrationCard
                        data={registration}
                        key={registration.id}
                        changeModal={changeModal}
                        deleteCard={handleDelete}
                      />
                    );
                  })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
