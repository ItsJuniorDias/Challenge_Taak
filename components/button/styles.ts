import styled from "styled-components/native";

type ButtonProps = {
  backgroundColor: string;
};

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 16px;
`;
