import { View, Text, useWindowDimensions } from "react-native";
import { ResultLayout } from "../../layouts/ResultLayout";
import { Divider } from "react-native-paper";

const DetalleExamen = ({ route }: any) => {
  const { width } = useWindowDimensions();
  const { examen } = route.params;

  return (
    <ResultLayout
      style={{
        flex: 1,
        paddingHorizontal: width * 0.05,
      }}
    >
      <Text className="mb-2 text-2xl italic font-bold text-center text-textcolor">
        Detalles del Examen
        {/* {examen.id} */}
      </Text>

      <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
        Coprologico
        {/* {examen.id} */}
      </Text>
      <View className="mb-20">
        <View>
          <Text className="mb-2 text-base font-bold">
            Color Heces:{" "}
            <Text className="font-normal">{examen.coprologico.colorHeces}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Consistencia:{" "}
            <Text className="font-normal">
              {examen.coprologico.consistencia}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Eritrocitos:{" "}
            <Text className="font-normal">
              {examen.coprologico.eritrocitos}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Grasa Fecal:{" "}
            <Text className="font-normal">{examen.coprologico.grasaFecal}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Leucocitos:{" "}
            <Text className="font-normal">{examen.coprologico.leucocitos}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Parasitos:{" "}
            <Text className="font-normal">{examen.coprologico.parasitos}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            PH: <Text className="font-normal">{examen.coprologico.ph}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Sangre Oculta:{" "}
            <Text className="font-normal">
              {examen.coprologico.sangreOculta}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Recomendaciones:{" "}
            <Text className="font-normal">
              {examen.coprologico.recomendaciones}
            </Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Electrolitos
          </Text>
          <Text className="mb-2 text-base font-bold">
            Cloro:{" "}
            <Text className="font-normal">{examen.electrolitos.cloro}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Sodio:{" "}
            <Text className="font-normal">{examen.electrolitos.sodio}</Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Glicemia
          </Text>
          <Text className="mb-2 text-base font-bold">
            Ayuno: <Text className="font-normal">{examen.glicemia.ayuno}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Hemoglobina Glicosilada:{" "}
            <Text className="font-normal">
              {examen.glicemia.hemoglobinaGlicosilada}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Postprandial:{" "}
            <Text className="font-normal">{examen.glicemia.postprandial}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Recomendaciones:{" "}
            <Text className="font-normal">
              {examen.glicemia.recomendaciones}
            </Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Hemograma
          </Text>
          <Text className="mb-2 text-base font-bold">
            Hemoglobina:{" "}
            <Text className="font-normal">{examen.hemograma.hb}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Hematocrito:{" "}
            <Text className="font-normal">{examen.hemograma.hematocrito}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Leucocitos:{" "}
            <Text className="font-normal">{examen.hemograma.leucocitos}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Neutrofilos:{" "}
            <Text className="font-normal">{examen.hemograma.neutrofilos}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Plaquetas:{" "}
            <Text className="font-normal">{examen.hemograma.plaquetas}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Globulos Rojos:{" "}
            <Text className="font-normal">
              {examen.hemograma.globulosRojos}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Globulos Rojos:{" "}
            <Text className="font-normal">
              {examen.hemograma.recomendaciones}
            </Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Perfil Lipidico
          </Text>
          <Text className="mb-2 text-base font-bold">
            Colesterol:{" "}
            <Text className="font-normal">
              {examen.perfilLipidico.colesterol}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            hdl:{" "}
            <Text className="font-normal">{examen.perfilLipidico.hdl}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            ldl:{" "}
            <Text className="font-normal">{examen.perfilLipidico.ldl}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            trigliceridos:{" "}
            <Text className="font-normal">
              {examen.perfilLipidico.trigliceridos}
            </Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Perfil Tiroideo
          </Text>
          <Text className="mb-2 text-base font-bold">
            t3: <Text className="font-normal">{examen.perfiltiroideo.t3}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            tsh:{" "}
            <Text className="font-normal">{examen.perfiltiroideo.tsh}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            recomendaciones:{" "}
            <Text className="font-normal">
              {examen.perfiltiroideo.recomendaciones}
            </Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Presion Arterial
          </Text>
          <Text className="mb-2 text-base font-bold">
            Diastolica:{" "}
            <Text className="font-normal">
              {examen.presionArterial.diastolica}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Sistolica:{" "}
            <Text className="font-normal">
              {examen.presionArterial.sistolica}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Recomendaciones:{" "}
            <Text className="font-normal">
              {examen.presionArterial.recomendaciones}
            </Text>
          </Text>
        </View>
        <Divider
          bold={true}
          style={{ backgroundColor: "blue", marginVertical: 10 }}
        />
        <View>
          <Text className="mb-2 text-xl italic font-bold text-start text-textcolor">
            Uroanalisis
          </Text>
          <Text className="mb-2 text-base font-bold">
            aspecto:{" "}
            <Text className="font-normal">{examen.uroanalisis.aspecto}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            bilirrubina:{" "}
            <Text className="font-normal">
              {examen.uroanalisis.bilirrubina}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Cetona:{" "}
            <Text className="font-normal">{examen.uroanalisis.cetona}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Color:{" "}
            <Text className="font-normal">{examen.uroanalisis.color}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Cilindros:{" "}
            <Text className="font-normal">{examen.uroanalisis.cilindros}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Densidad:{" "}
            <Text className="font-normal">{examen.uroanalisis.densidad}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Urobilinogeno:{" "}
            <Text className="font-normal">
              {examen.uroanalisis.urobilinogeno}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Globulos Blancos:{" "}
            <Text className="font-normal">
              {examen.uroanalisis.globulosBlancos}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Globulos Rojos:{" "}
            <Text className="font-normal">
              {examen.uroanalisis.globulosRojos}
            </Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Glucosa:{" "}
            <Text className="font-normal">{examen.uroanalisis.glucosa}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            PH: <Text className="font-normal">{examen.uroanalisis.ph}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Proteinas:{" "}
            <Text className="font-normal">{examen.uroanalisis.proteinas}</Text>
          </Text>
          <Text className="mb-2 text-base font-bold">
            Recomendaciones:{" "}
            <Text className="font-normal">
              {examen.uroanalisis.recomendaciones}
            </Text>
          </Text>
        </View>
      </View>
    </ResultLayout>
  );
};

export default DetalleExamen;
