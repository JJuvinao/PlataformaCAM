import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import { useExamenStore } from "../../store/useResultsStore";

export const CaptureGlicemiaScreen = () => {
  const { width } = useWindowDimensions();
  const { glicemia, actualizarGlicemia } = useExamenStore();
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor">Glicemia</Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600 ">Nivel</Text>
        <TextInput
          mode="outlined"
          placeholder="sistolica"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(nivel) => actualizarGlicemia({ nivel: nivel })}
          value={glicemia.nivel}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{glicemia.recomendaciones}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
