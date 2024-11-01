import { View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  message: string;
}

const AlertScreen = ({ visible, setVisible, message }: Props) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{
          backgroundColor: "white",
        }}
      >
        <Dialog.Title style={{ color: "#00000" }}>Información</Dialog.Title>
        <Dialog.Content>
          <Text style={{ color: "#00000" }}>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cerrar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AlertScreen;
