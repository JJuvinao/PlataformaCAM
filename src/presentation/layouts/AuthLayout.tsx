import React from "react";
import { View, Image, ImageBackground } from "react-native";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ImageBackground
      source={require("../../../assets/img/fondo-app.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{ alignItems: "center", paddingTop: 100, paddingBottom: 20 }}
      >
        <Image
          source={require("../../../assets/img/Logosimbolo-CAM.png")}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>

      {children}
    </ImageBackground>
  );
};
