import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";

import { ButtonSmall } from "~/components/Buttons";
import { RegistrationType } from "~/utils/types";

import * as S from "./styles";

type Props = {
  data: any;
  deleteCard: (id: string) => void;
  changeModal: (status: string, data: RegistrationType) => void;
};

const RegistrationCard = (props: Props) => {
  return (
    <>
      <S.Card>
        <S.IconAndText>
          <HiOutlineUser />
          <h3 aria-label={props.data.employeeName}>
            {props.data.employeeName}
          </h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p aria-label={props.data.email}>{props.data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span aria-label={props.data.admissionDate}>
            {props.data.admissionDate}
          </span>
        </S.IconAndText>
        <S.Actions>
          {props.data.status === "REVIEW" && (
            <ButtonSmall
              data-testid="btn-reprove"
              aria-label="Botão para reprovar o card"
              bgcolor="rgb(255, 145, 154)"
              onClick={() => {
                props.changeModal("REPROVED", props.data);
              }}
            >
              Reprovar
            </ButtonSmall>
          )}

          {props.data.status === "REVIEW" && (
            <ButtonSmall
              data-testid="btn-approved"
              bgcolor="rgb(155, 229, 155)"
              aria-label="Botão para aprovar o card"
              onClick={() => {
                props.changeModal("APPROVED", props.data);
              }}
            >
              Aprovar
            </ButtonSmall>
          )}
          {props.data.status !== "REVIEW" && (
            <ButtonSmall
              data-testid="btn-review"
              bgcolor="#ff8858"
              aria-label="Botão para enviar para revisão"
              onClick={() => {
                props.changeModal("REVIEW", props.data);
              }}
            >
              Revisar novamente
            </ButtonSmall>
          )}

          <HiOutlineTrash
            data-testid="btn-delete-card"
            aria-label="Botão para excluir o card"
            onClick={() => props.deleteCard(props.data.id)}
          />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
