import { Alert, Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { Button, TextInput } from "react-native-paper";
import { useState } from "react";
import { RolUsuario } from "../../../domain/entities/user";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AuthNavigator";
import { login } from "../../../actions/auth.actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const LoginScreen = () => {
  const [user, setUser] = useState({
    correo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const handleChange = async () => {
    if (user.correo.length === 0 || user.password.length === 0) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const wasSucessfull = await login(user.correo, user.password);
      if (wasSucessfull) {
        navigation.navigate("LoginScreen");
        return;
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al crear el usuario");
    } finally {
      setLoading(false);
    }
  };
  return (
    <MainLayout>
      <View className="flex-1 mx-6" style={{ paddingTop: top + 50 }}>
        <Text className="mx-2 mb-2 text-base text-gray-500">Correo: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="default"
          onChangeText={(text) => {
            setUser({ ...user, correo: text });
          }}
        />
        <Text className="mx-2 mb-2 text-base text-gray-500 ">Contraseña: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="default"
          onChangeText={(text) => {
            setUser({ ...user, password: text });
          }}
        />
        <View className="flex items-center justify-center">
          <Button
            onPress={handleChange}
            disabled={loading}
            mode="contained"
            textColor="#FFFFFF"
            className="w-1/2 mb-8 bg-colorButton"
          >
            <Text className="italic font-bold text-white">Iniciar Sesión</Text>
          </Button>
          <Button onPress={() => navigation.navigate("RegisterScreen")}>
            <Text className="text-textcolor">
              ¿Es tu Primera Vez? Regístrate
            </Text>
          </Button>
        </View>
      </View>
    </MainLayout>
  );
};
