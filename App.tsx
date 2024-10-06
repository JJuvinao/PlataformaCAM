import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainNavigator from "./src/presentation/navigation/MainNavigator";
import { AuthProvider } from "./src/presentation/provider/AuthProvider";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
