import styled from "styled-components/native";

type TextProps = {
  title: string;
  fontFamily: string;
  fontSize: number;
  color: string;
};

export const Text = styled.Text<TextProps>`
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize}px;
  color: ${({ color }) => color};
`;
