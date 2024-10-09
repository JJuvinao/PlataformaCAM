import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import { useExamenStore } from "../../store/useResultsStore";

export const CaptureCoprologicoScreen = () => {
  const { width } = useWindowDimensions();
  const { actualizarCoprologico, coprologico } = useExamenStore();
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-lg font-bold text-textcolor">Coprológico</Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600">Color Heces</Text>
        <TextInput
          mode="outlined"
          placeholder="color heces"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(color) => actualizarCoprologico({ colorHeces: color })}
          value={coprologico.colorHeces}
        />
        <Text className="my-2 text-base text-gray-600">Consistencia</Text>
        <TextInput
          mode="outlined"
          placeholder="consistencia"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(consistencia) =>
            actualizarCoprologico({ consistencia: consistencia })
          }
          value={coprologico.consistencia}
        />
        <Text className="my-2 text-base text-gray-600">PH</Text>
        <TextInput
          mode="outlined"
          placeholder="ph"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(ph) => actualizarCoprologico({ ph: ph })}
          value={coprologico.ph}
        />
        <Text className="my-2 text-base text-gray-600">Sangre Oculta</Text>
        <TextInput
          mode="outlined"
          placeholder="sangre oculta"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(sangreOculta) =>
            actualizarCoprologico({ sangreOculta: sangreOculta })
          }
          value={coprologico.sangreOculta}
        />
        <Text className="my-2 text-base text-gray-600">
          Parasitos y huevos de parasitos
        </Text>
        <TextInput
          mode="outlined"
          placeholder="parasitos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(parasitos) =>
            actualizarCoprologico({ parasitos: parasitos })
          }
          value={coprologico.parasitos}
        />
        <Text className="my-2 text-base text-gray-600">Leucocitos</Text>
        <TextInput
          mode="outlined"
          placeholder="leucocitos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(leucocitos) =>
            actualizarCoprologico({ leucocitos: leucocitos })
          }
          value={coprologico.leucocitos}
        />
        <Text className="my-2 text-base text-gray-600">Eritrocitos</Text>
        <TextInput
          mode="outlined"
          placeholder="eritrocitos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(eritrocitos) =>
            actualizarCoprologico({ eritrocitos: eritrocitos })
          }
          value={coprologico.eritrocitos}
        />
        <Text className="my-2 text-base text-gray-600">Grasa Fecal</Text>
        <TextInput
          mode="outlined"
          placeholder="grasaFecal"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(grasaFecal) =>
            actualizarCoprologico({ grasaFecal: grasaFecal })
          }
          value={coprologico.grasaFecal}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{coprologico.recomendaciones}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
