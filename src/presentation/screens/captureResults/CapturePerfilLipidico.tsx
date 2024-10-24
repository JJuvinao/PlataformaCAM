import React, { useEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import {
  generarRecomendacionesPerfilLipidico,
  useExamenStore,
} from "../../store/useResultsStore";
import { TextInput } from "react-native-paper";

export const CapturePerfilLipidicoScreen = () => {
  const { width } = useWindowDimensions();
  const perfilLipidico = useExamenStore((state) => state.perfilLipidico);
  const actualizarPerfilLipidico = useExamenStore(
    (state) => state.actualizarPerfilLipidico
  );

  // Efecto para generar y actualizar recomendaciones cada vez que el perfil lipídico cambie
  useEffect(() => {
    const recomendaciones =
      generarRecomendacionesPerfilLipidico(perfilLipidico);
    actualizarPerfilLipidico({ recomendacioneslipidico: recomendaciones });
  }, [
    perfilLipidico.trigliceridos,
    perfilLipidico.colesterol,
    perfilLipidico.hdl,
    perfilLipidico.ldl,
  ]);

  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor">
        Perfil Lipídico
      </Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600 ">Triglicéridos</Text>
        <TextInput
          mode="outlined"
          placeholder="trigliceridos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(trigliceridos) =>
            actualizarPerfilLipidico({ trigliceridos })
          }
          value={perfilLipidico.trigliceridos}
        />
        <Text className="my-2 text-base text-gray-600 ">Colesterol Total</Text>
        <TextInput
          mode="outlined"
          placeholder="colesterol"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(colesterol) =>
            actualizarPerfilLipidico({ colesterol })
          }
          value={perfilLipidico.colesterol}
        />
        <Text className="my-2 text-base text-gray-600 ">HDL</Text>
        <TextInput
          mode="outlined"
          placeholder="hdl"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(hdl) => actualizarPerfilLipidico({ hdl })}
          value={perfilLipidico.hdl}
        />
        <Text className="my-2 text-base text-gray-600 ">LDL</Text>
        <TextInput
          mode="outlined"
          placeholder="ldl"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(ldl) => actualizarPerfilLipidico({ ldl })}
          value={perfilLipidico.ldl}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{perfilLipidico.recomendacioneslipidico}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
