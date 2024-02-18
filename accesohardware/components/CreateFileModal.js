// CreateFileModal.js
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

const CreateFileModal = ({ visible, setVisible, fetchFiles }) => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleSaveFile = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${fileName}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, fileContent);
      alert('Archivo guardado en: ' + fileUri);
      fetchFiles();
      setVisible(false);
      setFileName('');
      setFileContent('');
    } catch (error) {
      console.error('Error al acceder al almacenamiento:', error);
    }
  };

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
            onChangeText={text => setFileName(text)}
          />
          <Text style={styles.modalText}>Contenido del archivo:</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Contenido del archivo"
            multiline={true}
            value={fileContent}
            onChangeText={text => setFileContent(text)}
          />
          <Button title="Guardar archivo" onPress={handleSaveFile} />
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

export default CreateFileModal;
