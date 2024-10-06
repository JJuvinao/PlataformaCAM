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
    desc: "Tempor sit cupidatat nostrud anim occaecat ea ipsum qui nisi. Est dolor commodo Lorem proident aliquip voluptate duis veniam aliquip fugiat. Cillum ut cillum anim ipsum dolore aute officia dolor minim commodo elit consequat. Est magna anim ut elit laborum enim ex occaecat pariatur deserunt.",
    img: require("../../../../assets/img/Logosimbolo-CAM.png"),
  },
  {
    title: "Instrucciones de Manejo",
    desc: "Cupidatat eu fugiat in culpa non laboris et excepteur aliquip. Sint nostrud fugiat culpa sit fugiat dolor magna occaecat dolore. Fugiat consequat mollit sunt sunt voluptate adipisicing quis exercitation laborum anim pariatur non laboris nulla.",
    img: require("../../../../assets/img/Logosimbolo-CAM.png"),
  },
  {
    title: "Otros Temas",
    desc: "Tempor sit cupidatat nostrud anim occaecat ea ipsum qui nisi. Est dolor commodo Lorem proident aliquip voluptate duis veniam aliquip fugiat. Cillum ut cillum anim ipsum dolore aute officia dolor minim commodo elit consequat. Est magna anim ut elit laborum enim ex occaecat pariatur deserunt.",
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

      <Text className="mt-5">{desc}</Text>
    </View>
  );
};
