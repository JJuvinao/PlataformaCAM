import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const MainLayout = ({ children, style }: Props) => {
  const waveImage = require("../../../assets/img/icono-menu-inferior.png");

  return (
    <>
      <ImageBackground
        source={require("../../../assets/img/fondo-app.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/img/Logosimbolo-CAM.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={style}>{children}</View>
        </ScrollView>
      </ImageBackground>
      <Image source={waveImage} style={styles.waveImage} />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  waveImage: {
    position: "absolute",
    bottom: 0,
    height: 70,
    width: "105%",
    alignSelf: "center",
    resizeMode: "cover",
    zIndex: 20,
  },
});
