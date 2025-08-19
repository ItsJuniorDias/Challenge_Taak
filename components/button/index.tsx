import React from "react";
import { Text } from "..";
import { Button } from "./styles";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
import { Colors } from "@/constants/Colors";

export interface ButtonComponentProps extends TouchableOpacityProps {
  testID?: string;
  title: string;
  backgroundColor: string;
  colorText: string;
  onPress: () => void;
  isLoading?: boolean;
}

export default function ButtonComponent({
  testID = "button_testID",
  title,
  backgroundColor,
  colorText,
  onPress,
  isLoading,
  ...props
}: ButtonComponentProps) {
  return (
    <Button
      {...props}
      testID={testID}
      onPress={onPress}
      backgroundColor={backgroundColor}
    >
      {isLoading && (
        <ActivityIndicator color={Colors.light.background} size="small" />
      )}

      {!isLoading && (
        <Text
          title={title}
          color={colorText}
          fontFamily="semi-bold"
          fontSize={16}
        />
      )}
    </Button>
  );
}
