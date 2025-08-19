import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 88px;
  background-color: ${Colors.light.background};
  margin-top: 24px;
  border-radius: 8px;
  padding-left: 24px;
  padding-top: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  gap: 32px;
`;
