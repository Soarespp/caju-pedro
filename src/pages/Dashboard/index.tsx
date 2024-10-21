import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useEffect } from "react";
import Loading from "./components/Loading";
import { useCadastroContext } from "~/Context";
import ModalConfirmation from "~/components/ModalConfirmacao";
import Error from "./components/Error";
import ModalMessage from "~/components/ModalMessage";

const DashboardPage = () => {
  const { loading, getDados, error } = useCadastroContext();

  useEffect(() => {
    getDados();
  }, []);

  if (error) {
    return <Error msgError={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ModalConfirmation />
      <ModalMessage />
      <S.Container>
        <SearchBar />
        <Collumns />
      </S.Container>
    </>
  );
};
export default DashboardPage;
