import * as S from "./styles";

const Loading = () => {
  return (
    <S.ContainerLoader>
      <S.logo>
        <p aria-label="Carregando os dados... "> loading...</p>
      </S.logo>
    </S.ContainerLoader>
  );
};

export default Loading;
