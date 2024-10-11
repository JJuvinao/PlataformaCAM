import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import { useExamenStore } from "../../store/useResultsStore";

export const CapturePotasioScreen = () => {
  const { width } = useWindowDimensions();
  const { actualizarPotasio, potasio } = useExamenStore();
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-xl italic font-bold text-textcolor">Potasio</Text>
      <View className="w-full p-4 my-2 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600">Rango</Text>
        <TextInput
          mode="outlined"
          placeholder="Rango de Potasio"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(rango) => actualizarPotasio({ rango })}
          value={potasio.rango}
        />
      </View>

      {potasio.rango !== "" && potasio.recomendaciones !== "" && (
        <View className="w-full p-4 mb-5 rounded-3xl">
          <Text className="text-2xl font-bold text-center text-textcolor">
            Sugerencias
          </Text>
          <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
            <Text>{potasio.recomendaciones}</Text>
          </View>
        </View>
      )}
    </MainLayout>
  );
};
