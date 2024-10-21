import styled from "styled-components";

export const ContainerLoader = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const logo = styled.div`
  margin: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  animation: rotateslide 5s linear infinite;

  @keyframes rotateslide {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(100px, 0);
    }
    50% {
      transform: translate(100px, 100px);
    }
    75% {
      transform: translate(0, 100px);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;
