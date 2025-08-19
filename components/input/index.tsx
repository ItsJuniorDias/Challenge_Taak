import React from "react";

import { Text } from "../";

import { Input } from "./styles";
import { TextInputProps } from "react-native";
import { FieldError } from "react-hook-form";

interface InputComponentProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (item: string) => void;
  error: string | undefined;
}

export default function InputComponent({
  value,
  onChangeText,
  placeholder,
  error,
  ...props
}: InputComponentProps) {
  return (
    <>
      <Input
        {...props}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={error}
      />

      {error && (
        <Text title={error} fontSize={14} fontFamily="regular" color="red" />
      )}
    </>
  );
}
