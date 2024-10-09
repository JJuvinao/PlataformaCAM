import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import { HomeCaptureResults } from "../screens/captureResults/HomeCaptureResultsScreen";
import { CapturePotasioScreen } from "../screens/captureResults/CapturePotasioScreen";
import { CaptureHemogramaScreen } from "../screens/captureResults/CaptureHemogramaScreen";
import { CapturePresionArterialScreen } from "../screens/captureResults/CapturePresionArterialScreen";
import { CaptureGlicemiaScreen } from "../screens/captureResults/CaptureGlicemiaScreen";
import { CaptureCoprologicoScreen } from "../screens/captureResults/CaptureCoprologicoScreen";
import { CaptureUroanalisisScreen } from "../screens/captureResults/CaptureUroanalisisScreen";

export type RootStackParamList = {
  HomeNavigator: undefined;
  SlidesScreen: undefined;
  Bottontab: undefined;
  HomeCaptureResults: undefined;
  CapturePotasioScreen: undefined;
  CaptureHemogramaScreen: undefined;
  CapturePresionArterialScreen: undefined;
  CaptureGlicemiaScreen: undefined;
  CaptureCoprologicoScreen: undefined;
  CaptureUroanalisisScreen: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Bottontab" component={BottonNavigation} /> */}
      <Stack.Screen name="HomeNavigator" component={HomeScreen} />
      <Stack.Screen name="SlidesScreen" component={SlidesScreen} />
      <Stack.Screen name="HomeCaptureResults" component={HomeCaptureResults} />
      <Stack.Screen
        name="CapturePotasioScreen"
        component={CapturePotasioScreen}
      />
      <Stack.Screen
        name="CaptureHemogramaScreen"
        component={CaptureHemogramaScreen}
      />
      <Stack.Screen
        name="CapturePresionArterialScreen"
        component={CapturePresionArterialScreen}
      />
      <Stack.Screen
        name="CaptureGlicemiaScreen"
        component={CaptureGlicemiaScreen}
      />
      <Stack.Screen
        name="CaptureCoprologicoScreen"
        component={CaptureCoprologicoScreen}
      />
      <Stack.Screen
        name="CaptureUroanalisisScreen"
        component={CaptureUroanalisisScreen}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
