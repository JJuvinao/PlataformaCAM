import React, { useEffect } from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import {
  generarRecomendacionesUroanalisis,
  useExamenStore,
} from "../../store/useResultsStore";
import { CustomButton } from "../../components/shared/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";

export const CaptureUroanalisisScreen = () => {
  const { width } = useWindowDimensions();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  // const { uroanalisis, actualizarUroanalisis } = useExamenStore();
  const uroanalisis = useExamenStore((state) => state.uroanalisis);
  const actualizarUroanalisis = useExamenStore(
    (state) => state.actualizarUroanalisis
  );

  useEffect(() => {
    const recomendaciones = generarRecomendacionesUroanalisis(uroanalisis);
    actualizarUroanalisis({ recomendaciones: recomendaciones });
  }, [
    uroanalisis.aspecto,
    uroanalisis.color,
    uroanalisis.densidad,
    uroanalisis.ph,
    uroanalisis.proteinas,
    uroanalisis.glucosa,
    uroanalisis.cetona,
    uroanalisis.bilirrubina,
    uroanalisis.urobilinogeno,
    uroanalisis.globulosRojos,
    uroanalisis.globulosBlancos,
    uroanalisis.cilindros,
    uroanalisis.recomendaciones,
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
        Uroanalisis
      </Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600">Aspecto</Text>
        <TextInput
          mode="outlined"
          placeholder="aspecto ej: limpio"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          autoCapitalize="none"
          onChangeText={(aspecto) => actualizarUroanalisis({ aspecto })}
          value={uroanalisis.aspecto}
        />
        <Text className="my-2 text-base text-gray-600 ">Color</Text>
        <TextInput
          mode="outlined"
          placeholder="color ej: amarillo claro"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          onChangeText={(color) => actualizarUroanalisis({ color })}
          value={uroanalisis.color}
        />
        <Text className="my-2 text-base text-gray-600 ">Densidad</Text>
        <TextInput
          mode="outlined"
          placeholder="densidad ej: 1.005"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(densidad) => actualizarUroanalisis({ densidad })}
          value={uroanalisis.densidad}
        />
        <Text className="my-2 text-base text-gray-600 ">PH</Text>
        <TextInput
          mode="outlined"
          placeholder="ph ej: 4.5"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="decimal-pad"
          onChangeText={(ph) => actualizarUroanalisis({ ph })}
          value={uroanalisis.ph}
        />
        <Text className="my-2 text-base text-gray-600 ">
          Proteinas (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="proteinas"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(proteinas) => actualizarUroanalisis({ proteinas })}
          value={uroanalisis.proteinas}
        />
        <Text className="my-2 text-base text-gray-600 ">
          Glucosa (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="glucosa ej: positivo"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(glucosa) => actualizarUroanalisis({ glucosa })}
          value={uroanalisis.glucosa}
        />
        <Text className="my-2 text-base text-gray-600 ">
          Cetonas (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="cetonas ej: positivo"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          autoCapitalize="none"
          keyboardType="default"
          onChangeText={(cetona) => actualizarUroanalisis({ cetona })}
          value={uroanalisis.cetona}
        />
        <Text className="my-2 text-base text-gray-600 ">
          Bilirrubina (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="bilirrubina ej: positivo"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(bilirrubina) => actualizarUroanalisis({ bilirrubina })}
          value={uroanalisis.bilirrubina}
        />
        <Text className="my-2 text-base text-gray-600 ">
          Urobilinogeno (positivo - negativo)
        </Text>
        <TextInput
          mode="outlined"
          placeholder="urobilinogeno ej: 1.0"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="decimal-pad"
          onChangeText={(urobilinogeno) =>
            actualizarUroanalisis({ urobilinogeno })
          }
          value={uroanalisis.urobilinogeno}
        />
        <Text className="my-2 text-base text-gray-600">Sedimento</Text>

        <Text className="my-1 text-sm text-gray-600">Glóbulos Rojos</Text>
        <TextInput
          mode="outlined"
          placeholder="Glóbulos rojos ej: 0"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(globulosrojos) =>
            actualizarUroanalisis({
              globulosRojos: globulosrojos,
            })
          }
          value={uroanalisis.globulosRojos}
        />

        <Text className="my-1 text-sm text-gray-600">Glóbulos Blancos</Text>
        <TextInput
          mode="outlined"
          placeholder="Glóbulos blancos ej: 0"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(globulosblancos) =>
            actualizarUroanalisis({
              globulosBlancos: globulosblancos,
            })
          }
          value={uroanalisis.globulosBlancos}
        />

        <Text className="my-1 text-sm text-gray-600">Cilindros</Text>
        <TextInput
          mode="outlined"
          placeholder="Cilindros ej: 0"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(cilindros) =>
            actualizarUroanalisis({
              cilindros: cilindros,
            })
          }
          value={uroanalisis.cilindros}
        />
      </View>
      <CustomButton
        title="Siguiente"
        onPress={() => navigation.navigate("ResultsUroanalisi")}
      />
      {/* <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{uroanalisis?.recomendaciones}</Text>
        </View>
      </View> */}
    </MainLayout>
  );
};
