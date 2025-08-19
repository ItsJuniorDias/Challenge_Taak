import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  background-color: ${Colors.light.background};
  border-color: #ddd;
  border-width: 2px;
  border-radius: 8px;
  font-size: 16;
  padding: 8px;
  margin-top: 16px;
`;
