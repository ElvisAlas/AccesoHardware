// ViewFileModal.js
import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ViewFileModal = ({ visible, setVisible, fileName, fileContent }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Nombre del archivo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del archivo"
            value={fileName}
            editable={false}
          />
          <Text style={styles.modalText}>Contenido del archivo:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    minWidth: 300,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default ViewFileModal;
