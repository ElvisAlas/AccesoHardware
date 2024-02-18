
import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import modalStyles from '../style/modal';
const ViewFileModal = ({ visible, setVisible, fileName, fileContent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>Nombre del archivo:</Text>
          <TextInput
            style={modalStyles.input}
            placeholder="Nombre del archivo"
            value={fileName}
            editable={false}
          />
          <Text style={modalStyles.modalText}>Contenido del archivo:</Text>
          <TextInput
            style={[modalStyles.input, { height: 100 }]}
            placeholder="Contenido del archivo"
            multiline={true}
            value={fileContent}
            editable={false}
          />
          <Button title="Cerrar" onPress={() => setVisible(false)} />
        </View>
      </View>
    </Modal>
  );
};


export default ViewFileModal;
