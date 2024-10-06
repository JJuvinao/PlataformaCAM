import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import BottonNavigation from "./BottoNavigation";

export type RootStackParamList = {
  Home: undefined;
  SlidesScreen: undefined;
  Bottontab: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bottontab" component={BottonNavigation} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
