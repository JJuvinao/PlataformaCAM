import { View, Text, useWindowDimensions, ScrollView, ActivityIndicator } from "react-native";
import { ResultLayout } from "../../layouts/ResultLayout";
import { Divider } from "react-native-paper";
import { useEffect, useState } from "react";
import { fetchUsuarioPorDocumento } from "../../../actions/user.action";
import { UserRegisro } from "../../../domain/entities/user.entities";

const DetalleExamen = ({ route }: any) => {
  const { width } = useWindowDimensions();
  const { examen } = route.params;
  const [usuario, setUsuario] = useState<UserRegisro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        setLoading(true);
        const userData = await fetchUsuarioPorDocumento(examen.identificacion);
        setUsuario(userData);
      } catch (err: any) {
        console.error("Error al obtener usuario:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerUsuario();
  }, [examen.identificacion]);

  // Función para verificar si hay datos
  const tieneDatos = (seccion: any) => {
    if (!seccion) return false;
    return Object.values(seccion).some(valor => valor && valor !== "");
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return "No disponible";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Función para determinar el color de recomendación
  const getRecommendationColor = (text: string) => {
    if (!text) return "text-gray-600";
    if (text.includes("normal") || text.includes("Normal")) return "text-green-600";
    if (text.includes("consulta") || text.includes("médico")) return "text-orange-600";
    if (text.includes("Diabetes") || text.includes("diabetes")) return "text-red-600";
    if (text.includes("Hipotensión") || text.includes("hipotensión")) return "text-blue-600";
    return "text-gray-600";
  };

  // Componente para cada valor
  const ValorItem = ({ label, value, unit = "" }: { label: string; value: string; unit?: string }) => {
    if (!value || value === "") return null;
    return (
      <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
        <Text className="text-base text-gray-600">{label}</Text>
        <Text className="text-base font-semibold text-gray-800">
          {value} {unit}
        </Text>
      </View>
    );
  };

  // Componente para Recomendaciones
  const Recomendaciones = ({ text }: { text: string }) => {
    if (!text || text === "") return null;
    const colorClass = getRecommendationColor(text);
    return (
      <View className="mt-3 p-3 bg-blue-50 rounded-lg">
        <Text className="text-sm font-bold text-blue-800 mb-1">📋 Recomendación:</Text>
        <Text className={`text-sm ${colorClass}`}>{text}</Text>
      </View>
    );
  };

  // Componente para cada sección
  const SeccionExamen = ({ 
    titulo, 
    icono, 
    data, 
    valores, 
    recomendacionKey = "recomendaciones" 
  }: { 
    titulo: string; 
    icono: string; 
    data: any; 
    valores: { label: string; key: string; unit?: string }[];
    recomendacionKey?: string;
  }) => {
    if (!data || !tieneDatos(data)) return null;
    
    return (
      <View className="mb-5 bg-white rounded-xl overflow-hidden shadow-sm">
        {/* Header de la sección */}
        <View className="px-4 py-3 bg-colorButton">
          <Text className="text-lg font-bold text-white">
            {icono} {titulo}
          </Text>
        </View>
        
        {/* Cuerpo de la sección */}
        <View className="p-4">
          {valores.map((valor) => (
            <ValorItem 
              key={valor.key}
              label={valor.label}
              value={data[valor.key]}
              unit={valor.unit || ""}
            />
          ))}
          
          {/* Recomendaciones */}
          {data[recomendacionKey] && (
            <Recomendaciones text={data[recomendacionKey]} />
          )}
        </View>
      </View>
    );
  };

  return (
    <ResultLayout
      style={{
        flex: 1,
        paddingHorizontal: width * 0.05,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} className="mb-4">
        {/* Tarjeta de información general */}
        <View className="mb-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl overflow-hidden shadow-lg">
          <View className="p-5">
            <Text className="text-2xl font-bold text-gray text-center mb-2">
              📋 Detalles del Examen
            </Text>
            <Divider className="my-2 bg-gray/30" />

            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : error ? (
              <Text className="text-red-200 text-center">{error}</Text>
            ) : usuario ? (
              <View className="mt-3">
                <View className="flex-row flex-wrap">
                  <View className="w-1/2 pr-2">
                    <View className="mb-3">
                      <Text className="text-gray/80 text-xs mb-1">👤 Nombres</Text>
                      <Text className="text-gray font-bold text-sm">{usuario.nombres}</Text>
                    </View>
                     <View className="mb-3">
                      <Text className="text-gray/80 text-xs mb-1">👤 Apellidos</Text>
                      <Text className="text-gray font-bold text-sm">{usuario.apellidos}</Text>
                    </View>
                    <View className="mb-3">
                      <Text className="text-gray/80 text-xs mb-1">🆔 Documento</Text>
                      <Text className="text-gray font-bold text-sm">{usuario.numeroDocumento}</Text>
                    </View>
                  </View>

                  <View className="w-1/2 pl-2">
                   <View className="mb-3">
                      <Text className="text-gray/80 text-xs mb-1">📧 Correo</Text>
                      <Text className="text-gray font-bold text-sm">{usuario.correo}</Text>
                    </View>
                    <View className="mb-3">
                      <Text className="text-gray/80 text-xs mb-1">📱 Teléfono</Text>
                      <Text className="text-gray font-bold text-sm">{usuario.telefono}</Text>
                    </View>
                  </View>
                </View>

                <Divider className="my-3 bg-gray/30" />
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray/80 text-base">📅 Fecha de Registro</Text>
                  <Text className="text-gray font-bold text-base">{formatDate(examen.fecha_registro)}</Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
<Divider className="my-2 bg-white/30" />
        {/* Hemograma */}
        <SeccionExamen
          titulo="Hemograma"
          icono="🩸"
          data={examen.hemograma}
          valores={[
            { label: "Hemoglobina", key: "hb", unit: "g/dL" },
            { label: "Hematocrito", key: "hematocrito", unit: "%" },
            { label: "Leucocitos", key: "leucocitos", unit: "mm³" },
            { label: "Neutrófilos", key: "neutrofilos", unit: "%" },
            { label: "Plaquetas", key: "plaquetas", unit: "mm³" },
            { label: "Glóbulos Rojos", key: "globulosRojos", unit: "millones/mm³" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Presión Arterial */}
        <SeccionExamen
          titulo="Presión Arterial"
          icono="❤️"
          data={examen.presionArterial}
          valores={[
            { label: "Presión Sistólica", key: "sistolica", unit: "mmHg" },
            { label: "Presión Diastólica", key: "diastolica", unit: "mmHg" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Glicemia */}
        <SeccionExamen
          titulo="Glicemia"
          icono="🩸"
          data={examen.glicemia}
          valores={[
            { label: "Glicemia en Ayuno", key: "ayuno", unit: "mg/dL" },
            { label: "Glicemia Postprandial", key: "postprandial", unit: "mg/dL" },
            { label: "Hemoglobina Glicosilada", key: "hemoglobinaGlicosilada", unit: "%" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Coprológico */}
        <SeccionExamen
          titulo="Coprológico"
          icono="💩"
          data={examen.coprologico}
          valores={[
            { label: "Color de Heces", key: "colorHeces" },
            { label: "Consistencia", key: "consistencia" },
            { label: "pH", key: "ph" },
            { label: "Sangre Oculta", key: "sangreOculta" },
            { label: "Parásitos", key: "parasitos" },
            { label: "Leucocitos", key: "leucocitos" },
            { label: "Eritrocitos", key: "eritrocitos" },
            { label: "Grasa Fecal", key: "grasaFecal" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Uroanálisis */}
        <SeccionExamen
          titulo="Uroanálisis"
          icono="💧"
          data={examen.uroanalisis}
          valores={[
            { label: "Aspecto", key: "aspecto" },
            { label: "Color", key: "color" },
            { label: "Densidad", key: "densidad" },
            { label: "pH", key: "ph" },
            { label: "Proteínas", key: "proteinas" },
            { label: "Glucosa", key: "glucosa" },
            { label: "Cetonas", key: "cetona" },
            { label: "Bilirrubina", key: "bilirrubina" },
            { label: "Urobilinógeno", key: "urobilinogeno" },
            { label: "Glóbulos Rojos", key: "globulosRojos" },
            { label: "Glóbulos Blancos", key: "globulosBlancos" },
            { label: "Cilindros", key: "cilindros" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Electrolitos */}
        <SeccionExamen
          titulo="Electrolitos"
          icono="⚡"
          data={examen.electrolitos}
          valores={[
            { label: "Sodio", key: "sodio", unit: "mEq/L" },
            { label: "Cloro", key: "cloro", unit: "mEq/L" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Perfil Tiroideo */}
        <SeccionExamen
          titulo="Perfil Tiroideo"
          icono="🦋"
          data={examen.perfilTiroideo}
          valores={[
            { label: "TSH", key: "tsh", unit: "mUI/L" },
            { label: "T3", key: "t3", unit: "ng/dL" },
            { label: "T4 Libre", key: "t4Libre", unit: "ng/dL" },
          ]}
        />
<Divider className="my-2 bg-white/30" />
        {/* Perfil Lipídico */}
        <SeccionExamen
          titulo="Perfil Lipídico"
          icono="🧪"
          data={examen.perfilLipidico}
          valores={[
            { label: "Triglicéridos", key: "trigliceridos", unit: "mg/dL" },
            { label: "Colesterol Total", key: "colesterol", unit: "mg/dL" },
            { label: "HDL", key: "hdl", unit: "mg/dL" },
            { label: "LDL", key: "ldl", unit: "mg/dL" },
          ]}
          recomendacionKey="recomendacioneslipidico"
        />
<Divider className="my-2 bg-white/30" />
        {/* Resumen de valores críticos */}
        {(examen.hemograma?.recomendaciones ||
          examen.presionArterial?.recomendaciones ||
          examen.glicemia?.recomendaciones) && (
          <View className="mb-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <Text className="text-base font-bold text-amber-800 mb-2">⚠️ Resumen de Recomendaciones</Text>
            {examen.hemograma?.recomendaciones && (
              <Text className="text-sm text-amber-700 mb-1">• Hemograma: {examen.hemograma.recomendaciones.substring(0, 100)}...</Text>
            )}
            {examen.presionArterial?.recomendaciones && (
              <Text className="text-sm text-amber-700 mb-1">• Presión Arterial: {examen.presionArterial.recomendaciones}</Text>
            )}
            {examen.glicemia?.recomendaciones && (
              <Text className="text-sm text-amber-700">• Glicemia: {examen.glicemia.recomendaciones.substring(0, 100)}...</Text>
            )}
          </View>
        )}
<Divider className="my-2 bg-white/30" />
        {/* Pie de página */}
        <View className="h-20" />
      </ScrollView>
    </ResultLayout>
  );
};

export default DetalleExamen;