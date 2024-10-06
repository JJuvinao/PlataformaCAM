import { Text, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AuthNavigator";
import { login } from "../../../actions/auth.actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { LoginUser } from "../../../types";
import { obtenerUsuarioPorId } from "../../../actions/user.action";
import { useAuthStore } from "../../store/useAuthStore";
import { Formik } from "formik";
import { LoginSchema } from "../../../types/schemas/schemas";
import AlertScreen from "../../components/shared/AlertScreen";
import { useState } from "react";
import { AuthLayout } from "../../layouts/AuthLayout";

export const LoginScreen = () => {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const setUsers = useAuthStore((state) => state.setUser);
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (values: LoginUser) => login(values.correo, values.password),
    onError: (error) => {
      setAlertMessage(error.message || "Error al iniciar sesión");
      setVisible(true);
    },
    onSuccess: async (data) => {
      try {
        const usuario = await obtenerUsuarioPorId(data!);
        if (usuario) {
          setUsers(usuario);
        } else {
          setAlertMessage("Usuario no encontrado");
          setVisible(true);
        }
      } catch (error: any) {
        setAlertMessage(
          error.message ||
            "Credenciales incorrectas. Por favor, verifica tus datos e intenta de nuevo."
        );
        setVisible(true);
      }
    },
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          correo: "",
          password: "",
        }}
        validationSchema={LoginSchema}
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
              <Text className="mx-2 mb-2 text-base text-gray-500">
                Correo:{" "}
              </Text>
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

              <Text className="mx-2 my-3 mb-2 text-base text-gray-500">
                Contraseña:{" "}
              </Text>

              <TextInput
                mode="flat"
                underlineStyle={{ display: "none" }}
                placeholderTextColor="gray"
                textColor="#000000"
                secureTextEntry
                className="bg-white border border-gray-300 rounded-3xl h-11"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {errors.password && touched.password && (
                <Text className="text-red-500">{errors.password}</Text>
              )}
              <View className="flex items-center justify-center my-6">
                <Button
                  onPress={handleSubmit as any}
                  disabled={mutation.isPending}
                  mode="contained"
                  textColor="#FFFFFF"
                  className="w-1/2 mb-8 bg-colorButton"
                >
                  <Text className="italic font-bold text-white">
                    {mutation.isPending ? "Cargando..." : "Iniciar Sesión"}
                  </Text>
                </Button>
                <Button onPress={() => navigation.navigate("RegisterScreen")}>
                  <Text className="text-textcolor">
                    ¿Es tu Primera Vez? Regístrate
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
