import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AuthNavigator";
import { resetPassword } from "../../../actions/auth.actions";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { ResetPassword } from "../../../types";
import { Formik } from "formik";
import { reseetPasswordSchema } from "../../../types/schemas/schemas";
import AlertScreen from "../../components/shared/AlertScreen";
import { useState } from "react";
import { AuthLayout } from "../../layouts/AuthLayout";

export const ForgotPasswordScreen = () => {
  const [visible, setVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [error, setError] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();

  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (values: ResetPassword) => resetPassword(values.correo),
    onError: (error) => {
      setError(true);
      setAlertMessage(error.message || "Error al restablecer la contraseña");
      setVisible(true);
    },
    onSuccess: () => {
      setError(false);
      setAlertMessage(
        "Se ha enviado un correo a su correo con las instrucciones para restablecer su contraseña"
      );
      setVisible(true);
    },
  });

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          correo: "",
        }}
        validationSchema={reseetPasswordSchema}
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

              <View className="flex items-center justify-center my-6">
                <Button
                  onPress={handleSubmit as any}
                  disabled={mutation.isPending}
                  mode="contained"
                  textColor="#FFFFFF"
                  className="w-1/2 mb-8 bg-colorButton"
                >
                  <Text className="italic font-bold text-white">
                    {mutation.isPending ? "Cargando..." : "Enviar Correo "}
                  </Text>
                </Button>
                <Button onPress={() => navigation.goBack()}>
                  <Text className="text-textcolor">Volver</Text>
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
