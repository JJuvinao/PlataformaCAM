import React, { useState } from "react";
import { Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { Button } from "react-native-paper";
import { useExamenStore } from "../../store/useResultsStore";
import AlertScreen from "../../components/shared/AlertScreen";

export const HomeCaptureResults = () => {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  const { width } = useWindowDimensions();
  const guardarDatosEnFirebase = useExamenStore(
    (state) => state.guardarDatosEnFirebase
  );

  const handleDatos = async () => {
    await guardarDatosEnFirebase(() => {
      setAlertMessage("Resultados guardados con éxito");
      setVisible(true);
    });
  };
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="mb-2 text-center text-gray-600">Electrolitos</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CapturePotasioScreen")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>

      <Text className="mb-2 text-center text-gray-600">Hemograma</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CaptureHemogramaScreen")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>
      <Text className="mb-2 text-center text-gray-600">Glicemia</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CaptureGlicemiaScreen")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>

      <Text className="mb-2 text-center text-gray-600">Presión Arterial</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CapturePresionArterialScreen")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>

      <Text className="mb-2 text-center text-gray-600">Coprologico</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CaptureCoprologicoScreen")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>

      <Text className="mb-2 text-center text-gray-600">Uroanalisis</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CaptureUroanalisisScreen")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>
      <Text className="mb-2 text-center text-gray-600">Perfil Tiroideo</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CapturePerfilTiroideo")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>
      <Text className="mb-2 text-center text-gray-600">Perfil Lipídico</Text>
      <TouchableOpacity
        className="w-full p-4 mb-5 bg-white rounded-3xl"
        onPress={() => navigation.navigate("CapturePerfilLipidico")}
      >
        <AntDesign
          name="edit"
          size={24}
          color="#4b5563"
          style={{ textAlign: "right" }}
        />
      </TouchableOpacity>
      <Button
        mode="contained-tonal"
        className="w-full mb-24 bg-colorButton rounded-3xl"
        onPress={handleDatos}
      >
        <Text className="text-xl italic font-bold text-white">Capturar</Text>
      </Button>
      <AlertScreen
        visible={visible}
        setVisible={setVisible}
        message={alertMessage}
      />
    </MainLayout>
  );
};
