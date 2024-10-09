import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { HomeScreen } from "../screens/home/HomeScreen";
import { SlidesScreen } from "../components/ui/SlidesScreen";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";
import StackNavigator from "./StackNavigator";

const { width } = Dimensions.get("window");

const Tab = createMaterialBottomTabNavigator();

function BottonNavigation() {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        inactiveColor="#fff"
        barStyle={styles.barStyle}
        activeIndicatorStyle={{
          backgroundColor: "",
        }}
      >
        {/* <Tab.Screen
          name="Stack"
          component={HomeScreen}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color="white" />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Home"
          component={StackNavigator}
          options={{
            tabBarLabel: "Inicio",
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color="white" />
            ),
          }}
        />
        <Tab.Screen
          name="Slider"
          component={SlidesScreen}
          options={{
            tabBarLabel: "Slider",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="th-list" size={24} color="white" />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barStyle: {
    backgroundColor: "transparent",
    height: 66,
    marginHorizontal: -25,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    width: width + 50,
  },
});

export default BottonNavigation;
