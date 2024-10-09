import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useExamenStore } from "../../store/useResultsStore";
import { TextInput } from "react-native-paper";

export const CapturePresionArterialScreen = () => {
  const { width } = useWindowDimensions();
  const { presionArterial, actualizarPresionArterial } = useExamenStore();
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-lg italic font-bold text-textcolor">
        Presión Arterial
      </Text>
      <View className="w-full p-4 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600 ">Sistólica</Text>
        <TextInput
          mode="outlined"
          placeholder="sistolica"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(sistolica) =>
            actualizarPresionArterial({ sistolica: sistolica })
          }
          value={presionArterial.sistolica}
        />
        <Text className="my-2 text-base text-gray-600 ">Diastolica</Text>
        <TextInput
          mode="outlined"
          placeholder="diastolica"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(diastolica) =>
            actualizarPresionArterial({ diastolica: diastolica })
          }
          value={presionArterial.diastolica}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{presionArterial.recomendaciones}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
