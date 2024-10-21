import { useCadastroContext } from "~/Context";

import * as S from "./styles";
import Button from "../Buttons";

const ModalConfirmation = () => {
  const { modalQuestion, changeModal, handleChangeStatus } =
    useCadastroContext();

  const handleConfirm = () => {
    if (!!modalQuestion.data && !!modalQuestion.status)
      handleChangeStatus(modalQuestion.status, modalQuestion.data);

    changeModal();
  };

  const getStatosMov = () => {
    if (modalQuestion.status === "REVIEW") {
      return "Revisar";
    }

    if (modalQuestion.status === "APPROVED") {
      return "Aprovado";
    }

    return "Reprovado";
  };

  return (
    <>
      {modalQuestion?.open && (
        <S.Container>
          <S.Modal>
            <S.Title>
              <h2>Deseja confirmar o evento?</h2>
              <h3
                aria-label={`Modal de confirmação: Desejar passar o card para${getStatosMov()}`}
              >{`Desejar passar o card para ${getStatosMov()}`}</h3>
            </S.Title>

            <S.ModalFooter>
              <Button
                bgcolor="#FF919A"
                data-testid="btn-cance-modal"
                aria-label="Botão cancelar"
                onClick={() => changeModal()}
              >
                Cancel
              </Button>
              <Button
                data-testid="btn-confirm-modal"
                aria-label="Botão confirmar"
                onClick={() => handleConfirm()}
              >
                Confirmar
              </Button>
            </S.ModalFooter>
          </S.Modal>
        </S.Container>
      )}
    </>
  );
};

export default ModalConfirmation;
