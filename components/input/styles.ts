import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

type TextInputProps = {
  error: string;
};

export const Input = styled.TextInput<TextInputProps>`
  width: 100%;
  height: 40px;
  background-color: ${Colors.light.background};
  border-color: ${({ error }) => (error ? "red" : "#ddd")};
  border-width: 2px;
  border-radius: 8px;
  font-size: 16;
  padding: 8px;
  margin-top: 16px;
  margin-bottom: 8px;
`;
