import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import { MainLayout } from "../../layouts/MainLayout";
import { TextInput } from "react-native-paper";
import { useExamenStore } from "../../store/useResultsStore";

export const CaptureUroanalisisScreen = () => {
  const { width } = useWindowDimensions();
  const { uroanalisis, actualizarUroanalisis } = useExamenStore();
  console.log(uroanalisis);
  return (
    <MainLayout
      style={{
        flex: 1,
        alignItems: "flex-start",
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="text-lg italic font-bold text-textcolor">
        Uroanalisis
      </Text>
      <View className="w-full p-4 mb-5 bg-white rounded-3xl">
        <Text className="text-base text-gray-600 ">Aspecto</Text>
        <TextInput
          mode="outlined"
          placeholder="aspecto"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          onChangeText={(aspecto) =>
            actualizarUroanalisis({ aspecto: aspecto })
          }
          value={uroanalisis.aspecto}
        />
        <Text className="my-2 text-base text-gray-600 ">Color</Text>
        <TextInput
          mode="outlined"
          placeholder="color"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          onChangeText={(color) => actualizarUroanalisis({ color: color })}
          value={uroanalisis.color}
        />
        <Text className="my-2 text-base text-gray-600 ">Densidad</Text>
        <TextInput
          mode="outlined"
          placeholder="densidad"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(densidad) =>
            actualizarUroanalisis({ densidad: densidad })
          }
          value={uroanalisis.densidad}
        />
        <Text className="my-2 text-base text-gray-600 ">PH</Text>
        <TextInput
          mode="outlined"
          placeholder="ph"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(ph) => actualizarUroanalisis({ ph: ph })}
          value={uroanalisis.ph}
        />
        <Text className="my-2 text-base text-gray-600 ">Proteinas</Text>
        <TextInput
          mode="outlined"
          placeholder="proteinas"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(proteinas) =>
            actualizarUroanalisis({ proteinas: proteinas })
          }
          value={uroanalisis.proteinas}
        />
        <Text className="my-2 text-base text-gray-600 ">Glucosa</Text>
        <TextInput
          mode="outlined"
          placeholder="glucosa"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(glucosa) =>
            actualizarUroanalisis({ glucosa: glucosa })
          }
          value={uroanalisis.glucosa}
        />
        <Text className="my-2 text-base text-gray-600 ">Cetonas</Text>
        <TextInput
          mode="outlined"
          placeholder="cetonas"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(cetonas) => actualizarUroanalisis({ cetona: cetonas })}
        />
        <Text className="my-2 text-base text-gray-600 ">Bilirrubina</Text>
        <TextInput
          mode="outlined"
          placeholder="bilirrubina"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(bilirrubina) =>
            actualizarUroanalisis({ bilirrubina: bilirrubina })
          }
          value={uroanalisis.bilirrubina}
        />
        <Text className="my-2 text-base text-gray-600 ">Urobilinogeno</Text>
        <TextInput
          mode="outlined"
          placeholder="urobilinogeno"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(urobilinogeno) =>
            actualizarUroanalisis({ urobilinogeno: urobilinogeno })
          }
          value={uroanalisis.urobilinogeno}
        />
        <Text className="my-2 text-base text-gray-600">Sedimento</Text>

        <Text className="my-1 text-sm text-gray-600">Glóbulos Rojos</Text>
        <TextInput
          mode="outlined"
          placeholder="Glóbulos Rojos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(globulosRojos) =>
            actualizarUroanalisis({
              sedimento: { ...uroanalisis.sedimento, globulosRojos },
            })
          }
          value={uroanalisis.sedimento.globulosRojos}
        />

        <Text className="my-1 text-sm text-gray-600">Glóbulos Blancos</Text>
        <TextInput
          mode="outlined"
          placeholder="Glóbulos Blancos"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(globulosBlancos) =>
            actualizarUroanalisis({
              sedimento: { ...uroanalisis.sedimento, globulosBlancos },
            })
          }
          value={uroanalisis.sedimento.globulosBlancos}
        />

        <Text className="my-1 text-sm text-gray-600">Cilindros</Text>
        <TextInput
          mode="outlined"
          placeholder="Cilindros"
          className="mt-2 rounded-full"
          outlineColor="#0093FB"
          activeOutlineColor="#0093FB"
          keyboardType="numeric"
          onChangeText={(cilindros) =>
            actualizarUroanalisis({
              sedimento: { ...uroanalisis.sedimento, cilindros },
            })
          }
          value={uroanalisis.sedimento.cilindros}
        />
      </View>
      <View className="w-full p-4 mb-20 bg-white rounded-3xl">
        <Text className="my-2 text-2xl font-bold text-center text-textcolor">
          Sugerencias
        </Text>
        <View className="flex flex-row p-3 text-justify bg-white border border-gray-400 rounded-3xl">
          <Text>{uroanalisis.recomendaciones}</Text>
        </View>
      </View>
    </MainLayout>
  );
};
