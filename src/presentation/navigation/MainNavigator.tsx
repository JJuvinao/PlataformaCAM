import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from "../store/useAuthStore";
import DrawerNavigation from "./DrawerNavigation";

const Stack = createStackNavigator();
const MainNavigator = () => {
  const { user } = useAuthStore();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name="Admin"
          component={DrawerNavigation}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
