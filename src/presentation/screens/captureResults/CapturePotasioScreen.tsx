import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import {
  generarRecomendacionesElectrolitos,
  useExamenStore,
} from "../../store/useResultsStore";
import { useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { CustomButton } from "../../components/shared/CustomButtom";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { useNavigation } from "@react-navigation/native";

export const CapturePotasioScreen = () => {
  const { width } = useWindowDimensions();
  // const { actualizarElectrolitos, electrolitos } = useExamenStore();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const electrolitos = useExamenStore((state) => state.electrolitos);
  const actualizarElectrolitos = useExamenStore(
    (state) => state.actualizarElectrolitos
  );

  useEffect(() => {
    const recomendaciones = generarRecomendacionesElectrolitos(electrolitos);
    actualizarElectrolitos({ recomendaciones });
  }, [electrolitos.sodio, electrolitos.cloro, electrolitos.recomendaciones]);

  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor">
        Electrólitos
      </Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600">Rango</Text>
        <TextInput
          mode="outlined"
          placeholder="Rango de Potasio"
          className="mt-2 bg-white rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          textColor="#000000"
          keyboardType="numeric"
          onChangeText={(sodio) => actualizarElectrolitos({ sodio })}
          value={electrolitos.sodio}
        />
        <Text className="text-base text-gray-600">Cloro</Text>
        <TextInput
          mode="outlined"
          placeholder="Rango de Potasio"
          className="mt-2 bg-white rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          textColor="#000000"
          keyboardType="numeric"
          onChangeText={(cloro) => actualizarElectrolitos({ cloro })}
          value={electrolitos.cloro}
        />
      </View>

      <CustomButton
        title="Siguiente"
        onPress={() => navigation.navigate("ResultsElectrolitos")}
      />

      {/* <View className="w-full p-4 mb-5 rounded-3xl">
        <Text className="text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{electrolitos.recomendaciones}</Text>
        </View>
      </View> */}
    </MainLayout>
  );
};
