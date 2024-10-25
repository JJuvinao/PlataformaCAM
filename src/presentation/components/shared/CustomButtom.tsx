import React from "react";
import { GestureResponderEvent, Text, View } from "react-native";
import { Button } from "react-native-paper";

interface Props {
  title: string;
  onPress?: ((e: GestureResponderEvent) => void) | undefined;
}

export const CustomButton = ({ title, onPress }: Props) => {
  return (
    <Button
      mode="contained-tonal"
      className="w-full mb-24 bg-colorButton rounded-3xl"
      onPress={onPress}
    >
      <Text className="text-xl italic font-bold text-white">{title}</Text>
    </Button>
  );
};
