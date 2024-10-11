import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import { useExamenStore } from "../../store/useResultsStore";

export const CaptureHemogramaScreen = () => {
  const { width } = useWindowDimensions();
  const { hemograma, actualizarHemograma } = useExamenStore();
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor">Hemograma</Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600 ">HB</Text>
        <TextInput
          mode="outlined"
          placeholder="hb"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(hb) => actualizarHemograma({ hb: hb })}
          value={hemograma.hb}
        />
        <Text className="my-2 text-base text-gray-600 ">Hematocritos</Text>
        <TextInput
          mode="outlined"
          placeholder="hematocritos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(hematocritos) =>
            actualizarHemograma({ hematocrito: hematocritos })
          }
          value={hemograma.hematocrito}
        />
        <Text className="my-2 text-base text-gray-600 ">Plaqueta</Text>
        <TextInput
          mode="outlined"
          placeholder="plaquetas"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(plaquetas) =>
            actualizarHemograma({ plaquetas: plaquetas })
          }
          value={hemograma.plaquetas}
        />
        <Text className="my-2 text-base text-gray-600 ">Glóbulos Rojos</Text>
        <TextInput
          mode="outlined"
          placeholder="globulos rojos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(globulosRojos) =>
            actualizarHemograma({ globulosRojos: globulosRojos })
          }
          value={hemograma.globulosRojos}
        />
        <Text className="my-2 text-base text-gray-600 ">Calcio</Text>
        <TextInput
          mode="outlined"
          placeholder="calcio"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(calcio) => actualizarHemograma({ calcio: calcio })}
          value={hemograma.calcio}
        />
        <Text className="my-2 text-base text-gray-600 ">Creatinina</Text>
        <TextInput
          mode="outlined"
          placeholder="creatinina"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(creatinina) =>
            actualizarHemograma({ creatinina: creatinina })
          }
          value={hemograma.creatinina}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{hemograma.recomendaciones}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
