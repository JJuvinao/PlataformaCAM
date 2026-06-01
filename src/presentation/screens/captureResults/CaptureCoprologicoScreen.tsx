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
  ]);

  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor mb-3">
        Coprológico
      </Text>
      <View className="w-full p-3 bg-white rounded-3xl">
        <Text className="text-sm font-semibold text-gray-700 mb-1">Color Heces</Text>
        <TextInput
          mode="outlined"
          placeholder="marrón"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(color) => actualizarCoprologico({ colorHeces: color })}
          value={coprologico.colorHeces}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">Consistencia</Text>
        <TextInput
          mode="outlined"
          placeholder="normal"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(consistencia) =>
            actualizarCoprologico({ consistencia: consistencia })
          }
          value={coprologico.consistencia}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">PH</Text>
        <TextInput
          mode="outlined"
          placeholder="1"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(ph) => actualizarCoprologico({ ph: ph })}
          value={coprologico.ph}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">
          Sangre Oculta (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="positivo"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(sangreOculta) =>
            actualizarCoprologico({ sangreOculta: sangreOculta })
          }
          value={coprologico.sangreOculta}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">
          Huevos y parásitos (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="negativo"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(parasitos) =>
            actualizarCoprologico({ parasitos: parasitos })
          }
          value={coprologico.parasitos}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">Leucocitos</Text>
        <TextInput
          mode="outlined"
          placeholder="1"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(leucocitos) =>
            actualizarCoprologico({ leucocitos: leucocitos })
          }
          value={coprologico.leucocitos}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">Eritrocitos</Text>
        <TextInput
          mode="outlined"
          placeholder="1"
          dense
          className="mb-3 bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(eritrocitos) =>
            actualizarCoprologico({ eritrocitos: eritrocitos })
          }
          value={coprologico.eritrocitos}
        />

        <Text className="text-sm font-semibold text-gray-700 mb-1">
          Grasa Fecal (positiva - negativa)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="positiva"
          dense
          className="bg-white rounded-lg"
          outlineColor="#0093FB"
          textColor="#000000"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(grasaFecal) =>
            actualizarCoprologico({ grasaFecal: grasaFecal })
          }
          value={coprologico.grasaFecal}
        />
      </View>

      <View className="w-full mt-4 mb-6">
        <CustomButton
          title="Siguiente"
          onPress={() => navigation.navigate("ResultsCoprologico")}
        />
      </View>
    </MainLayout>
  );
};
