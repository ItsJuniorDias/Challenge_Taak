import React from "react";
import { Text } from "..";
import { Button } from "./styles";
import { TouchableOpacityProps } from "react-native";

export interface ButtonComponentProps extends TouchableOpacityProps {
  testID?: string;
  title: string;
  backgroundColor: string;
  colorText: string;
  onPress: () => void;
}

export default function ButtonComponent({
  testID = "button_testID",
  title,
  backgroundColor,
  colorText,
  onPress,
  ...props
}: ButtonComponentProps) {
  return (
    <Button
      {...props}
      testID={testID}
      onPress={onPress}
      backgroundColor={backgroundColor}
    >
      <Text
        title={title}
        color={colorText}
        fontFamily="semi-bold"
        fontSize={16}
      />
    </Button>
  );
}
