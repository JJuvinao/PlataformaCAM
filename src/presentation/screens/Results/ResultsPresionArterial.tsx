import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { useExamenStore } from "../../store/useResultsStore";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { CustomButton } from "../../components/shared/CustomButtom";

export const ResultPresionArterial = () => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const presionArterial = useExamenStore((state) => state.presionArterial);
  const { width } = useWindowDimensions();
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="mb-2 text-2xl italic font-bold text-center text-textcolor">
          Resultdos Presión Arterial
        </Text>
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{presionArterial?.recomendaciones}</Text>
        </View>
      </View>
      <CustomButton
        title="Siguiente"
        onPress={() => navigation.navigate("CaptureCoprologicoScreen")}
      />
    </MainLayout>
  );
};
