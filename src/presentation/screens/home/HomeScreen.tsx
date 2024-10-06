import { StackScreenProps } from "@react-navigation/stack";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { MainLayout } from "../../layouts/MainLayout";
import { logout } from "../../../actions/auth.actions";

interface Props extends StackScreenProps<RootStackParamList, "Home"> {}

export const HomeScreen = () => {
  return (
    <>
      <MainLayout
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 40,
        }}
      >
        <Button
          mode="contained-tonal"
          className="w-full bg-colorButton bottom-24 rounded-3xl"
          onPress={() => {}}
        >
          <Text className="text-xl italic font-bold text-white ">
            Captura de Resultados
          </Text>
        </Button>
        {/* <Button
          mode="contained-tonal"
          className="w-full bg-colorButton bottom-24 rounded-3xl"
          onPress={() => logout()}
        >
          <Text className="text-xl italic font-bold text-white ">
            Captura de Resultados
          </Text>
        </Button> */}
      </MainLayout>
      <View className="absolute bottom-0 z-10 flex flex-row items-center justify-center w-full">
        <Image
          className="absolute -bottom-10 "
          source={require("../../../../assets/img/ilustración.png")}
          style={{ width: 350, height: 350 }}
          resizeMode="contain"
        />
      </View>
    </>
  );
};
