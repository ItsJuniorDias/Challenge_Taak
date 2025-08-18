import React from "react";
import { Text } from "..";
import { Button } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface ButtonComponentProps extends TouchableOpacityProps {
  title: string;
  backgroundColor: string;
  colorText: string;
  onPress: () => void;
}

export default function ButtonComponent({
  title,
  backgroundColor,
  colorText,
  onPress,
  ...props
}: ButtonComponentProps) {
  return (
    <Button {...props} onPress={onPress} backgroundColor={backgroundColor}>
      <Text
        title={title}
        color={colorText}
        fontFamily="semi-bold"
        fontSize={16}
      />
    </Button>
  );
}
