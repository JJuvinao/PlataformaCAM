import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import {
  generarRecomendacionesCoprologico,
  useExamenStore,
} from "../../store/useResultsStore";
import { useEffect } from "react";
import { CustomButton } from "../../components/shared/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";

export const CaptureCoprologicoScreen = () => {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  // const { actualizarCoprologico, coprologico } = useExamenStore();
  const actualizarCoprologico = useExamenStore(
    (state) => state.actualizarCoprologico
  );
  const coprologico = useExamenStore((state) => state.coprologico);

  useEffect(() => {
    const recomendaciones = generarRecomendacionesCoprologico(coprologico);
    actualizarCoprologico({ recomendaciones: recomendaciones });
  }, [
    coprologico.colorHeces,
    coprologico.consistencia,
    coprologico.ph,
    coprologico.sangreOculta,
    coprologico.parasitos,
    coprologico.leucocitos,
    coprologico.eritrocitos,
    coprologico.grasaFecal,
    coprologico.recomendaciones,
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
        Coprológico
      </Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600">Color Heces</Text>
        <TextInput
          mode="outlined"
          placeholder="color heces ej: marrón"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(color) => actualizarCoprologico({ colorHeces: color })}
          value={coprologico.colorHeces}
        />
        <Text className="my-2 text-base text-gray-600">Consistencia</Text>
        <TextInput
          mode="outlined"
          placeholder="consistencia ej: normal"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(consistencia) =>
            actualizarCoprologico({ consistencia: consistencia })
          }
          value={coprologico.consistencia}
        />

        <Text className="my-2 text-base text-gray-600">PH</Text>
        <TextInput
          mode="outlined"
          placeholder="ph fecal ej: 1"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(ph) => actualizarCoprologico({ ph: ph })}
          value={coprologico.ph}
        />
        <Text className="my-2 text-base text-gray-600">
          Sangre Oculta (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="sangre oculta ej: positivo"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(sangreOculta) =>
            actualizarCoprologico({ sangreOculta: sangreOculta })
          }
          value={coprologico.sangreOculta}
        />
        <Text className="my-2 text-base text-gray-600">
          Huevos y parasitos en las heces (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="parasitos ej: negativo"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(parasitos) =>
            actualizarCoprologico({ parasitos: parasitos })
          }
          value={coprologico.parasitos}
        />
        <Text className="my-2 text-base text-gray-600">Leucocitos</Text>
        <TextInput
          mode="outlined"
          placeholder="valor ej: 1"
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
          placeholder="valor ej: 1"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(eritrocitos) =>
            actualizarCoprologico({ eritrocitos: eritrocitos })
          }
          value={coprologico.eritrocitos}
        />
        <Text className="my-2 text-base text-gray-600">
          Grasa Fecal (positiva - negativa)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="grasa ej: positiva "
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(grasaFecal) =>
            actualizarCoprologico({ grasaFecal: grasaFecal })
          }
          value={coprologico.grasaFecal}
        />
      </View>
      <CustomButton
        title="Siguiente"
        onPress={() => navigation.navigate("ResultsCoprologico")}
      />
      {/* <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{coprologico.recomendaciones}</Text>
        </View>
      </View> */}
    </MainLayout>
  );
};
