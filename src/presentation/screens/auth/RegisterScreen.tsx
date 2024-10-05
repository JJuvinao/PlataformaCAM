import { Button, Text, TextInput } from "react-native-paper";
import { Alert, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { registerUser } from "../../../actions/auth.actions";
import { RolUsuario } from "../../../domain/entities/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AuthNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { Picker } from "@react-native-picker/picker";

export const RegisterScreen = () => {
  const { top } = useSafeAreaInsets();
  const [user, setUser] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    correo: "",
    password: "",
    roles: RolUsuario.CLIENTE,
  });
  const [loading, setLoading] = useState(false);

  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const handleChange = async () => {
    if (
      user.nombre.length === 0 ||
      user.apellidos.length === 0 ||
      user.telefono.length === 0 ||
      user.correo.length === 0 ||
      user.password.length === 0
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      const wasSucessfull = await registerUser(
        user.tipoDocumento,
        user.numeroDocumento,
        user.nombre,
        user.apellidos,
        user.telefono,
        user.correo,
        user.password,
        user.roles
      );
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
        <Text className="mx-2 mb-2 text-gray-500 ">Tipo de Documento: </Text>

        <View className="flex justify-center bg-white border border-gray-300 rounded-3xl h-11">
          <Picker
            selectedValue={
              user.tipoDocumento.length > 0 ? user.tipoDocumento : "DNI"
            }
            onValueChange={(itemValue, itemIndex) => {
              setUser({ ...user, tipoDocumento: itemValue });
            }}
            className="w-full"
          >
            <Picker.Item label="CC" value="cc" />
            <Picker.Item label="Pasaporte" value="pasaporte" />
            <Picker.Item label="Certificado" value="certificado" />
          </Picker>
        </View>
        <Text className="mx-2 mb-2 text-gray-500 ">Nro de documento: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="number-pad"
          onChangeText={(text) => {
            setUser({ ...user, numeroDocumento: text });
          }}
        />
        <Text className="mx-2 mb-2 text-gray-500 ">Nombres: </Text>

        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="default"
          onChangeText={(text) => {
            setUser({ ...user, nombre: text });
          }}
        />
        <Text className="mx-2 mb-2 text-gray-500 ">Apellidos: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="default"
          onChangeText={(text) => {
            setUser({ ...user, apellidos: text });
          }}
        />
        <Text className="mx-2 mb-2 text-gray-500">Celular: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="number-pad"
          onChangeText={(text) => {
            setUser({ ...user, telefono: text });
          }}
        />
        <Text className="mx-2 mb-2 text-gray-500">Correo: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          textColor="#000000"
          className="mb-6 bg-white border border-gray-300 rounded-3xl h-11"
          keyboardType="email-address"
          onChangeText={(text) => {
            setUser({ ...user, correo: text });
          }}
        />
        <Text className="mx-2 mb-2 text-gray-500">Contraseña: </Text>
        <TextInput
          mode="flat"
          underlineStyle={{ display: "none" }}
          placeholderTextColor="gray"
          secureTextEntry
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
            <Text className="italic font-bold text-white">Registrase</Text>
          </Button>
          <Button onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="text-textcolor">
              ¿Ya eres Miembro? Inicia sesión
            </Text>
          </Button>
        </View>
      </View>
    </MainLayout>
  );
};
