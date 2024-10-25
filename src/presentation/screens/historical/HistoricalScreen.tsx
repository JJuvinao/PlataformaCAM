import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { ResultLayout } from "../../layouts/ResultLayout";
import { ActivityIndicator } from "react-native-paper";

interface Examen {
  id: string;
  hemograma: {
    hb: string;
    hematocrito: string;
  };
  presionArterial: {
    sistolica: string;
    diastolica: string;
  };
  fecha: any;
}

export type Props = StackScreenProps<RootStackParamList, "HistorialScreen">;

const HistorialExamenes = ({ navigation }: Props) => {
  const [examenes, setExamenes] = useState<Examen[]>([]);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();
  const obtenerExamenes = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "examenes"));
      const listaExamenes: Examen[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Examen[];

      setExamenes(listaExamenes);
      setLoading(false);
    } catch (error) {
      console.log("Error al obtener los exámenes:", error);
    }
  };

  useEffect(() => {
    obtenerExamenes();
  }, []);

  const renderExamen = ({ item }: { item: Examen }) => (
    <TouchableOpacity
      className="p-4 mb-4 bg-white rounded-lg shadow"
      onPress={() =>
        navigation.navigate("DetallesResultScreen", { examen: item })
      }
    >
      <Text className="text-lg font-bold">Examen {item.id}</Text>
      <Text className="text-sm text-gray-600">
        Fecha: {new Date(item.fecha.seconds * 1000).toLocaleDateString()}
      </Text>
      <Text className="text-sm">Hemoglobina: {item.hemograma.hb} g/dL</Text>
      <Text className="text-sm">
        Hematocrito: {item.hemograma.hematocrito} %
      </Text>
      <Text className="text-sm">
        Presión Arterial: {item.presionArterial.sistolica}/
        {item.presionArterial.diastolica} mmHg
      </Text>
    </TouchableOpacity>
  );

  return (
    <ResultLayout
      style={{
        flex: 1,
        paddingHorizontal: width * 0.05,
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#3463FA" />
      ) : (
        <>
          <Text className="mb-2 text-2xl italic font-bold text-center text-textcolor">
            Historial de Exámenes
          </Text>
          {examenes.length > 0 ? (
            <FlatList
              data={examenes}
              renderItem={renderExamen}
              keyExtractor={(item) => item.id}
            />
          ) : (
            <Text className="mt-6 text-lg text-center">
              No hay exámenes registrados.
            </Text>
          )}
        </>
      )}
    </ResultLayout>
  );
};

export default HistorialExamenes;
