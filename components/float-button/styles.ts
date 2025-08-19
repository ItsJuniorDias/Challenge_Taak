import { Colors } from "@/constants/Colors";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  width: 64px;
  height: 64px;
  background-color: ${Colors.light.background};
  border-radius: 50px;
  position: absolute;
  align-items: center;
  justify-content: center;
  right: 20;
  bottom: 120;
`;
