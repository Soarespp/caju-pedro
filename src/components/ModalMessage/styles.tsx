import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: absolute;
  background-color: rgba(183, 183, 183, 0.5);
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 350px;
    height: 250px;
    border: 2px solid rgb(204, 204, 204);
    border-radius: 12px;
    padding: 12px;
}
`;

export const Title = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 0%;
    justify-content: center;
    align-items: center;
}
`;

export const ModalFooter = styled.div`
    min-height: 40px;
    display: flex;
    justify-content: space-around;
}
`;
