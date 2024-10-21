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
          <h3>{props.data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{props.data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{props.data.admissionDate}</span>
        </S.IconAndText>
        <S.Actions>
          {props.data.status === "REVIEW" && (
            <ButtonSmall
              data-testid="btn-reprove"
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
              onClick={() => {
                props.changeModal("REVIEW", props.data);
              }}
            >
              Revisar novamente
            </ButtonSmall>
          )}

          <HiOutlineTrash
            data-testid="btn-delete-card"
            onClick={() => props.deleteCard(props.data.id)}
          />
        </S.Actions>
      </S.Card>
    </>
  );
};

export default RegistrationCard;
