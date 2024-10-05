import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { MainLayout } from "../../layouts/MainLayout";

interface Props extends StackScreenProps<RootStackParamList, "Home"> {}

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <MainLayout>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("SlidesScreen")}
      >
        Navegar
      </Button>
    </MainLayout>
  );
};
