import React from "react";
import { Pressable } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

export const HamburgerMenu = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}
      style={{ padding: 10 }}
    >
      <Ionicons name="menu" size={24} color="black" />
    </Pressable>
  );
};
