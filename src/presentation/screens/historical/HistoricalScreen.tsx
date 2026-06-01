import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/StackNavigator";
import { ResultLayout } from "../../layouts/ResultLayout";
import { ActivityIndicator, Searchbar, Button, Divider } from "react-native-paper";
import { useAuthStore } from "../../store/useAuthStore";
import { useExamenStore } from "../../store/useResultsStore";
import AntDesign from "@expo/vector-icons/AntDesign";

export type Props = StackScreenProps<RootStackParamList, "HistorialScreen">;

const HistorialExamenes = ({ navigation }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  
  const user = useAuthStore((state: { user: any; }) => state.user);
  const examenesFiltrados = useExamenStore((state) => state.examenes);
  const loading = useExamenStore((state) => state.loading);
  const listarMisExamenes = useExamenStore((state) => state.listarMisExamenes);
  const buscarExamenesPorIdentificacion = useExamenStore((state) => state.buscarExamenesPorIdentificacion);
  const limpiarFiltro = useExamenStore((state) => state.limpiarExamenes);

  const obtenerExamenes = async () => {
    try {
      if(user?.roles === "CLIENTE"){
        await buscarExamenesPorIdentificacion(user.numeroDocumento);
      }else{
        await listarMisExamenes();
      }
    } catch (error) {
      console.log("Error al obtener exámenes:", error);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text === "") {
      limpiarFiltro();
      obtenerExamenes();
    } else {
      await buscarExamenesPorIdentificacion(text);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerExamenes();
      setSearchQuery("");
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await obtenerExamenes();
    setSearchQuery("");
    setRefreshing(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Fecha no disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const obtenerResumen = (examen: any) => {
    const valores = [];
    if (examen.hemograma?.hb) {
      valores.push(`Hb: ${examen.hemograma.hb} g/dL`);
    }
    if (examen.presionArterial?.sistolica) {
      valores.push(`PA: ${examen.presionArterial.sistolica}/${examen.presionArterial.diastolica}`);
    }
    if (examen.glicemia?.ayuno) {
      valores.push(`Glucosa: ${examen.glicemia.ayuno} mg/dL`);
    }
    return valores;
  };

  const getStatusColor = (examen: any) => {
    const recomendaciones = [
      examen.hemograma?.recomendaciones,
      examen.presionArterial?.recomendaciones,
      examen.glicemia?.recomendaciones,
    ].filter(Boolean);
    
    if (recomendaciones.some(r => r?.includes("Diabetes") || r?.includes("diabetes") || r?.includes("elevado"))) {
      return "bg-red-500";
    }
    if (recomendaciones.some(r => r?.includes("consulta") || r?.includes("médico"))) {
      return "bg-orange-500";
    }
    if (recomendaciones.some(r => r?.includes("normal") || r?.includes("óptima"))) {
      return "bg-green-500";
    }
    return "bg-gray-400";
  };

  const renderExamen = ({ item }: { item: any }) => {
    const resumen = obtenerResumen(item);
    const statusColor = getStatusColor(item);
    
    return (
      <TouchableOpacity
        className="mb-5 rounded-xl overflow-hidden shadow-lg active:opacity-95"
        onPress={() => navigation.navigate("DetallesResultScreen", { examen: item })}
        activeOpacity={0.7}
      >
        <Divider className="my-2 bg-white/30" />
        {/* Marco exterior de la tarjeta */}
        <View className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          
          {/* Header con fecha y estado */}
          <View className="flex-row items-center justify-between px-5 py-3 bg-gray-50 border-b border-black-200">
            <View className="flex-row items-center">
              <View className={`w-2.5 h-2.5 rounded-full ${statusColor} mr-2`} />
              <Text className="text-xs text-gray-500">
                📅 {formatDate(item.fecha_registro)} • {formatTime(item.fecha_registro)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-xs text-colorButton mr-1">Ver detalles</Text>
              <AntDesign name="right" size={14} color="#0093FB" />
            </View>
          </View>
          
          {/* Cuerpo de la tarjeta */}
          <View className="p-5">
            {/* Paciente */}
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3 shadow-sm">
                <AntDesign name="user" size={22} color="#0093FB" />
              </View>
              <View>
                <Text className="text-xs text-gray-400 uppercase tracking-wide">Paciente</Text>
                <Text className="text-xl font-bold text-gray-800">
                  {item.identificacion}
                </Text>
              </View>
            </View>
            
            {/* Línea divisoria */}
            <View className="h-px bg-gray-200 my-2" />
            
            {/* Resumen de valores */}
            <View className="mt-3">
              <Text className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                📊 RESUMEN DE VALORES
              </Text>
              <View className="flex-row flex-wrap">
                {resumen.map((valor, idx) => (
                  <View key={idx} className="bg-gray-100 rounded-lg px-3 py-1.5 mr-2 mb-2">
                    <Text className="text-sm font-medium text-gray-700">{valor}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ResultLayout
      style={{
        flex: 1,
        paddingHorizontal: width * 0.05,
      }}
    >
      {/* Header */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-2">
          <View>
            <Text className="text-3xl font-bold text-gray-800">
              Historial Clínico
            </Text>
            {user && (
              <View className="flex-row items-center mt-1">
                <AntDesign name="user" size={14} color="#666" />
                <Text className="text-sm text-gray-500 ml-1">
                  {user.nombres} {user.apellidos}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Searchbar */}
      <Searchbar
        placeholder="🔍 Buscar por identificación del paciente..."
        onChangeText={handleSearch}
        value={searchQuery}
        className="mb-5 rounded-xl"
        iconColor="#0093FB"
        placeholderTextColor="#999"
        elevation={0}
        style={{ backgroundColor: "#f5f5f5", borderWidth: 1, borderColor: "#e5e5e5" }}
      />

      {/* Lista de exámenes */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0093FB" />
          <Text className="mt-4 text-gray-500">Cargando exámenes...</Text>
        </View>
      ) : (
        <>
          {examenesFiltrados && examenesFiltrados.length > 0 ? (
            <>
              <View className="flex-row justify-between items-center mb-4 px-1">
                <Text className="text-sm text-gray-500">
                  📋 {examenesFiltrados.length} examen{examenesFiltrados.length !== 1 ? "es" : ""} encontrado{examenesFiltrados.length !== 1 ? "s" : ""}
                </Text>
                <TouchableOpacity onPress={onRefresh} className="p-2">
                  <AntDesign name="reload1" size={18} color="#0093FB" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={examenesFiltrados}
                renderItem={renderExamen}
                keyExtractor={(item) => String(item.id)}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#0093FB"]} />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
                ItemSeparatorComponent={() => <View className="h-3" />}
              />
            </>
          ) : (
            <View className="flex-1 justify-center items-center mt-20">
              <View className="w-24 h-24 rounded-full bg-gray-100 items-center justify-center mb-4">
                <AntDesign name="inbox" size={40} color="#ccc" />
              </View>
              <Text className="text-lg text-center text-gray-500 font-medium">
                {searchQuery ? "No se encontraron resultados" : "No hay exámenes registrados"}
              </Text>
              <Text className="text-sm text-center text-gray-400 mt-2">
                {searchQuery 
                  ? "Intenta con otra identificación" 
                  : "Presiona el botón + para crear tu primer examen"}
              </Text>
            </View>
          )}
        </>
      )}
    </ResultLayout>
  );
};

export default HistorialExamenes;