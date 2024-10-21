import { RiSignalWifiErrorLine } from "react-icons/ri";

import * as S from "./styles";

type propsError = {
  msgError?: string;
};

const Error = ({ msgError }: propsError) => {
  return (
    <S.ContainerLoader>
      <S.logo>
        <RiSignalWifiErrorLine size="200px" />
        <h2>Houve o seguinte erro com a api:</h2>
        <h4>{msgError}</h4>
      </S.logo>
    </S.ContainerLoader>
  );
};

export default Error;
