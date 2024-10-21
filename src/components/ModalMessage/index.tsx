import { useCadastroContext } from "~/Context";

import * as S from "./styles";
import Button from "../Buttons";

const ModalMessage = () => {
  const { modalAviso, changeModalAviso } = useCadastroContext();

  return (
    <>
      {modalAviso?.open && (
        <S.Container>
          <S.Modal>
            <S.Title>
              <h2 aria-label={`Modal de avisos: ${modalAviso.msg}`}>
                {modalAviso.msg}
              </h2>
            </S.Title>

            <S.ModalFooter>
              <Button
                data-testid="btn-ok-msg"
                onClick={() => changeModalAviso()}
                aria-label="Confirma visualização do aviso"
              >
                OK!
              </Button>
            </S.ModalFooter>
          </S.Modal>
        </S.Container>
      )}
    </>
  );
};

export default ModalMessage;
