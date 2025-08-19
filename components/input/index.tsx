import React from "react";
import { Input } from "./styles";

interface InputComponentProps {
  placeholder: string;
  value: string;
  onChangeText: (item: string) => void;
}

export default function InputComponent({
  value,
  onChangeText,
  placeholder,
}: InputComponentProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
