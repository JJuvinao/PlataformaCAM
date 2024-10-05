import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import { useAuthStore } from "../store/useAuthStore";
import StackNavigator from "./StackNavigator";

const Stack = createStackNavigator();
const MainNavigator = () => {
  const { user } = useAuthStore();

  return (
    <Stack.Navigator>
      {user?.roles === "ADMIN" ? (
        <Stack.Screen
          name="Admin"
          component={StackNavigator}
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
