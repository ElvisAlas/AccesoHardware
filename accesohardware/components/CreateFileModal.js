
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button ,StyleSheet} from 'react-native';
import * as FileSystem from 'expo-file-system';
import modalStyles from '../style/modal';

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
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalText}>Nombre del archivo:</Text>
          <TextInput
            style={modalStyles.input}
            placeholder="Nombre del archivo"
            value={fileName}
            onChangeText={text => setFileName(text)}
          />
          <Text style={modalStyles.modalText}>Contenido del archivo:</Text>
          <TextInput
            style={[modalStyles.input, { height: 100 }]}
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

  
export default CreateFileModal;
