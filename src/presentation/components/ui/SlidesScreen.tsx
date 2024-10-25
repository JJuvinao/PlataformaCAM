import {
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: "Presentación de CAM",
    desc: "Bienvenido a la plataforma CAM, diseñada para la gestión de registros médicos de tus pacientes. A través de esta herramienta, puedes registrar, visualizar y manejar resultados médicos de manera eficiente, ayudando a un seguimiento adecuado de cada paciente.",
    img: require("../../../../assets/img/Logosimbolo-CAM.png"),
  },
  {
    title: "Instrucciones de Manejo",
    desc: "Selecciona el tipo de examen que deseas registrar en el menú principal. Los exámenes disponibles incluyen: electrolitos, hemograma, glicemia, presión arterial, coprológico, uroanálisis, perfil tiroideo y perfil lipídico. Ingresa los valores correspondientes para cada prueba, y guarda el examen para visualizar las recomendaciones automáticas según los resultados ingresados. Asegurese de escribir los valores corretos sin errores y asegure de que las palabras no contengan espacios al final",
    img: require("../../../../assets/img/Logosimbolo-CAM.png"),
  },
];

export const SlidesScreen = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / layoutMeasurement.width);

    setCurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);
  };

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;

    flatListRef.current.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem("isFirstLaunch", "true");
    navigation.goBack();
  };

  useEffect(() => {
    const checkTutorial = async () => {
      await AsyncStorage.getItem("isFirstLaunch");
    };
    checkTutorial();
  }, []);
  return (
    <View className="flex-1 ">
      <FlatList
        ref={flatListRef}
        data={items}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        onScroll={onScroll}
      />

      {currentSlideIndex === items.length - 1 ? (
        <Button
          text="Finalizar"
          onPress={handleFinish}
          styles={{ position: "absolute", bottom: 60, left: 150, width: 100 }}
        />
      ) : (
        <Button
          text=" > > > "
          styles={{ position: "absolute", bottom: 60, left: 150, width: 100 }}
          onPress={() => scrollToSlide(currentSlideIndex + 1)}
        />
      )}
    </View>
  );
};

interface SlideItemProps {
  item: Slide;
}

const SlideItem = ({ item }: SlideItemProps) => {
  const { width } = useWindowDimensions();
  const { title, desc, img } = item;

  return (
    <View
      className="justify-center flex-1 p-10 bg-white rounded-md"
      style={{
        width: width,
      }}
    >
      <Image
        source={img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: "center",
          alignSelf: "center",
        }}
      />

      <Text className="text-xl italic font-bold text-center text-textcolor">
        {title}
      </Text>

      <Text className="mt-5 text-justify">{desc}</Text>
    </View>
  );
};
