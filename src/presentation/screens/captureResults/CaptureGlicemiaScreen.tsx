import React, { useEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import {
  generarRecomendacionesGlicemia,
  useExamenStore,
} from "../../store/useResultsStore";
import { CustomButton } from "../../components/shared/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";

export const CaptureGlicemiaScreen = () => {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  // const { glicemia, actualizarGlicemia } = useExamenStore();

  const glicemia = useExamenStore((state) => state.glicemia);
  const actualizarGlicemia = useExamenStore(
    (state) => state.actualizarGlicemia
  );

  useEffect(() => {
    const recomendaciones = generarRecomendacionesGlicemia(glicemia);
    actualizarGlicemia({ recomendaciones: recomendaciones });
  }, [
    glicemia.ayuno,
    glicemia.postprandial,
    glicemia.hemoglobinaGlicosilada,
    glicemia.recomendaciones,
  ]);

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
        <Text className="text-base text-gray-600 ">Ayuno</Text>
        <TextInput
          mode="outlined"
          placeholder="sistolica ej: 70"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(ayuno) => actualizarGlicemia({ ayuno: ayuno })}
          value={glicemia.ayuno}
        />
        <Text className="text-base text-gray-600 ">Postprandial</Text>
        <TextInput
          mode="outlined"
          placeholder="postprandial ej: 140"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(postprandial) =>
            actualizarGlicemia({ postprandial: postprandial })
          }
          value={glicemia.postprandial}
        />
        <Text className="text-base text-gray-600 ">
          Hemoglobina Glicosilada
        </Text>
        <TextInput
          mode="outlined"
          placeholder="hemoglobina ej: 6.5"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="decimal-pad"
          onChangeText={(hemoglobinaGlicosilada) =>
            actualizarGlicemia({
              hemoglobinaGlicosilada: hemoglobinaGlicosilada,
            })
          }
          value={glicemia.hemoglobinaGlicosilada}
        />
      </View>
      <CustomButton
        title="Siguiente"
        onPress={() => navigation.navigate("ResultsGlicemia")}
      />
      {/* <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{glicemia.recomendaciones}</Text>
        </View>
      </View> */}
    </MainLayout>
  );
};
