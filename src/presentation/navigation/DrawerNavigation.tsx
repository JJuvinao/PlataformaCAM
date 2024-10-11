import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { HomeScreen } from "../screens/home/HomeScreen";
import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { logout } from "../../actions/auth.actions";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import StackNavigator, { RootStackParamList } from "./StackNavigator";
import BottonNavigation from "./BottoNavigation";

type RootStackParams = {
  DrawerNavigation: undefined;
  RegisterScreen: undefined;
};

const Drawer = createDrawerNavigator<RootStackParams>();

const handleLogout = async () => {
  await logout().then(() => {
    console.log("Sesion cerrada");
  });
};

function DrawerNavigation() {
  const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: dimensions.width >= 758 ? "permanent" : "slide",
        headerShown: true,
        headerStyle: {
          backgroundColor: "#3463FA",
          borderRadius: 20,
        },
        headerTitle: "",
        // headerLeft: () => <></>,
        drawerPosition: "right",

        headerTintColor: "#FFF",
        // headerRight: () => (
        //   <MaterialIcons
        //     name="logout"
        //     size={25}
        //     color="white"
        //     style={{ marginRight: 30 }}
        //     onPress={() => {}}
        //   />
        // ),
        drawerStyle: {
          backgroundColor: "#3463FA",
        },
        drawerActiveBackgroundColor: "none",
        drawerActiveTintColor: "#fff",
      }}
    >
      <Drawer.Screen
        name="DrawerNavigation"
        component={BottonNavigation}
        options={{
          drawerLabel: "",
          drawerLabelStyle: {
            color: "#FFF",
            fontSize: 16,
            fontWeight: "bold",
          },
        }}
      />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const navigation =
    useNavigation<StackScreenProps<RootStackParamList>["navigation"]>();
  return (
    <DrawerContentScrollView {...props}>
      <View className="items-center justify-center h-24 mb-5 rounded-full">
        {/* Imagen de perfil */}
        {/* <Image
          source={user?.fotoPerfil === "" ? require("../../../assets/no-product-image.png") : { uri: user?.fotoPerfil }}
          style={styles.profileImage}
        /> */}
      </View>

      <View className="items-center mb-5">
        <Text className="text-xl font-bold text-white">
          {"Michael Rodriguez"}
        </Text>
        <View className="w-4/5 mt-2 border-b-4 border-white" />
        {/* Línea blanca */}
      </View>

      <View className="flex-1 px-3 mt-2">
        <DrawerItemList {...props} />

        <TouchableOpacity onPress={() => {}} className="px-4 py-3 my-2 rounded">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">Historial</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => {}} className="px-4 py-3 my-2 rounded">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">
              Configuración
            </Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => {}} className="px-4 py-3 my-2 rounded">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">
              Presentación CAM
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SlidesScreen")}
          className="px-4 py-3 my-2 rounded"
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">
              Instrucciones
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("HomeCaptureResults")}
          className="px-4 py-3 my-2 rounded"
        >
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-white">
              Captura de datos
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="px-5 mt-20">
        <TouchableOpacity
          onPress={handleLogout}
          className="py-3 bg-white rounded-full"
        >
          <Text className="text-[#3463FA] font-bold text-center">
            Cerrar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerNavigation;
