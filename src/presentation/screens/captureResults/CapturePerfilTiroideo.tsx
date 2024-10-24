import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useExamenStore } from "../../store/useResultsStore";
import { TextInput } from "react-native-paper";

export const CapturePerfilTiroideoScreen = () => {
  const { width } = useWindowDimensions();
  const { perfiltiroideo, actualizarPerfilTiroideo } = useExamenStore();

  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor">
        Perfil Tiroideo
      </Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600 ">TSH</Text>
        <TextInput
          mode="outlined"
          placeholder="tsh"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(tsh) => actualizarPerfilTiroideo({ tsh: tsh })}
          value={perfiltiroideo.tsh}
        />
        <Text className="my-2 text-base text-gray-600 ">T3</Text>
        <TextInput
          mode="outlined"
          placeholder="t3"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(t3) => actualizarPerfilTiroideo({ t3: t3 })}
          value={perfiltiroideo.t3}
        />
        <Text className="my-2 text-base text-gray-600 ">T4 Libre</Text>
        <TextInput
          mode="outlined"
          placeholder="t4 libre"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(t4Libre) =>
            actualizarPerfilTiroideo({ t4Libre: t4Libre })
          }
          value={perfiltiroideo.t4Libre}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{perfiltiroideo.recomendaciones}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
