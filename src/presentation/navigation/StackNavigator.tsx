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
import { CapturePerfilLipidicoScreen } from "../screens/captureResults/CapturePerfilLipidico";
import { CapturePerfilTiroideoScreen } from "../screens/captureResults/CapturePerfilTiroideo";
import { ResultElectrolitos } from "../screens/Results/ResultsElectrolitos";
import { ResultHemograma } from "../screens/Results/ResultsHemograma";
import { ResultsGlicemia } from "../screens/Results/ResultsGlicemia";
import { ResultPresionArterial } from "../screens/Results/ResultsPresionArterial";
import { ResulsPerfilTiroideo } from "../screens/Results/ResultsPerfilTiroideo";
import { ResultsCoprologico } from "../screens/Results/ResultsCoprologico";
import { ResultsUroanalisis } from "../screens/Results/ResultsUroanalisis";
import { ResultsPerfilLipidico } from "../screens/Results/ResultsPerfilLipidico";
import HistorialExamenes from "../screens/historical/HistoricalScreen";
import DetalleExamen from "../screens/historical/ResutlDetailScreen";

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
  CapturePerfilLipidico: undefined;
  CapturePerfilTiroideo: undefined;
  ResultsElectrolitos: undefined;
  ResultsHemograma: undefined;
  ResultsGlicemia: undefined;
  ResultsPresionArterial: undefined;
  ResultsCoprologico: undefined;
  ResultsUroanalisi: undefined;
  ResultsPerfilTiroideo: undefined;
  ResultsPerfilLipidico: undefined;
  HistorialScreen: undefined;
  DetallesResultScreen: { examen: any };

  HomeDraweNavigator: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Bottontab" component={BottonNavigation} /> */}
      {/* <Stack.Screen name="HomeDraweNavigator" component={DrawerNavigation} /> */}
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
      <Stack.Screen
        name="CapturePerfilLipidico"
        component={CapturePerfilLipidicoScreen}
      />
      <Stack.Screen
        name="CapturePerfilTiroideo"
        component={CapturePerfilTiroideoScreen}
      />
      <Stack.Screen name="ResultsElectrolitos" component={ResultElectrolitos} />
      <Stack.Screen name="ResultsHemograma" component={ResultHemograma} />
      <Stack.Screen name="ResultsGlicemia" component={ResultsGlicemia} />
      <Stack.Screen
        name="ResultsPresionArterial"
        component={ResultPresionArterial}
      />
      <Stack.Screen name="ResultsCoprologico" component={ResultsCoprologico} />
      <Stack.Screen name="ResultsUroanalisi" component={ResultsUroanalisis} />
      <Stack.Screen
        name="ResultsPerfilTiroideo"
        component={ResulsPerfilTiroideo}
      />
      <Stack.Screen
        name="ResultsPerfilLipidico"
        component={ResultsPerfilLipidico}
      />
      <Stack.Screen name="HistorialScreen" component={HistorialExamenes} />
      <Stack.Screen name="DetallesResultScreen" component={DetalleExamen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
