import { Button, Text, TextInput } from "react-native-paper";
import { Alert, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../../navigation/AuthNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { Picker } from "@react-native-picker/picker";
import { useMutation } from "@tanstack/react-query";
import { Formik } from "formik";
import { registerUser } from "../../../actions/auth.actions";
import { RolUsuario } from "../../../domain/entities/user";
import { RegisterSchema } from "../../../types/schemas/schemas";
import { useState } from "react";
import AlertScreen from "../../components/shared/AlertScreen";
import { AuthLayout } from "../../layouts/AuthLayout";

export const RegisterScreen = () => {
  const { top } = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (values: any) =>
      registerUser(
        values.tipoDocumento,
        values.numeroDocumento,
        values.nombre,
        values.apellidos,
        values.telefono,
        values.correo,
        values.password,
        values.roles
      ),
    onSuccess: () => {
      navigation.navigate("LoginScreen");
    },
    onError: (error: any) => {
      setAlertMessage(error.message || "Error al crear el usuario");
      setVisible(true);
    },
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          tipoDocumento: "DNI",
          numeroDocumento: "",
          nombre: "",
          apellidos: "",
          telefono: "",
          correo: "",
          password: "",
          roles: RolUsuario.CLIENTE,
        }}
        validationSchema={RegisterSchema}
        onSubmit={(values) => {
          mutation.mutate(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View className="flex-1 mx-6" style={{ paddingTop: top + 50 }}>
              <Text className="mx-2 my-3 text-gray-500 ">
                Tipo de Documento:{" "}
              </Text>
              <View className="flex justify-center bg-white border border-gray-300 rounded-3xl h-11">
                <Picker
                  selectedValue={values.tipoDocumento}
                  onValueChange={handleChange("tipoDocumento")}
                  className="w-full"
                >
                  <Picker.Item label="CC" value="cc" />
                  <Picker.Item label="Pasaporte" value="pasaporte" />
                  <Picker.Item label="Certificado" value="certificado" />
                </Picker>
              </View>
              {errors.tipoDocumento && touched.tipoDocumento && (
                <Text className="text-red-500">{errors.tipoDocumento}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-500 ">
                Nro de documento:{" "}
              </Text>
              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                textColor="#000000"
                className="bg-white border border-gray-300 rounded-3xl h-11"
                keyboardType="number-pad"
                onChangeText={handleChange("numeroDocumento")}
                onBlur={handleBlur("numeroDocumento")}
                value={values.numeroDocumento}
              />
              {errors.numeroDocumento && touched.numeroDocumento && (
                <Text className="text-red-500">{errors.numeroDocumento}</Text>
              )}

              <Text className="mx-2 my-3 mb-2 text-gray-500 ">Nombres: </Text>
              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                textColor="#000000"
                className="bg-white border border-gray-300 rounded-3xl h-11"
                keyboardType="default"
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
              />
              {errors.nombre && touched.nombre && (
                <Text className="text-red-500">{errors.nombre}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-500 ">Apellidos: </Text>
              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                textColor="#000000"
                className="bg-white border border-gray-300 rounded-3xl h-11"
                keyboardType="default"
                onChangeText={handleChange("apellidos")}
                onBlur={handleBlur("apellidos")}
                value={values.apellidos}
              />
              {errors.apellidos && touched.apellidos && (
                <Text className="text-red-500">{errors.apellidos}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-500">Celular: </Text>
              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                textColor="#000000"
                className="bg-white border border-gray-300 rounded-3xl h-11"
                keyboardType="number-pad"
                onChangeText={handleChange("telefono")}
                onBlur={handleBlur("telefono")}
                value={values.telefono}
              />
              {errors.telefono && touched.telefono && (
                <Text className="text-red-500">{errors.telefono}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-500">Correo: </Text>
              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                textColor="#000000"
                className="bg-white border border-gray-300 rounded-3xl h-11"
                keyboardType="email-address"
                onChangeText={handleChange("correo")}
                onBlur={handleBlur("correo")}
                value={values.correo}
              />
              {errors.correo && touched.correo && (
                <Text className="text-red-500">{errors.correo}</Text>
              )}

              <Text className="mx-2 my-3 text-gray-500">Contraseña: </Text>
              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                secureTextEntry
                textColor="#000000"
                className="bg-white border border-gray-300 rounded-3xl h-11"
                keyboardType="default"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}

              <View className="flex items-center justify-center my-5">
                <Button
                  onPress={handleSubmit as any}
                  mode="contained"
                  textColor="#FFFFFF"
                  className="w-1/2 mb-4 bg-colorButton"
                >
                  <Text className="italic font-bold text-white">
                    {mutation.isPending ? "Cargando..." : "Registrarme"}
                  </Text>
                </Button>
                <Button onPress={() => navigation.navigate("LoginScreen")}>
                  <Text className="text-textcolor">
                    ¿Ya eres Miembro? Inicia sesión
                  </Text>
                </Button>
              </View>
            </View>
          </>
        )}
      </Formik>
      <AlertScreen
        visible={visible}
        setVisible={setVisible}
        message={alertMessage}
      />
    </AuthLayout>
  );
};
