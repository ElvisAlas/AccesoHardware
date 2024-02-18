// StorageAccess.js
import React, { useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet, Modal, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const iconMap = {
  txt: 'file-document',
  pdf: 'file-pdf',
  doc: 'file-word',
  docx: 'file-word',
  xls: 'file-excel',
  xlsx: 'file-excel',
  jpg: 'file-image',
  png: 'file-image',
  gif: 'file-image',
  mp4: 'file-video',
  mp3: 'file-music',
  default: 'file'
};

const StorageAccess = () => {
  const [fileList, setFileList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');

  const handleAccessStorage = async () => {
    setModalVisible(true);
  };

  const handleSaveFile = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}${fileName}.txt`;
      await FileSystem.writeAsStringAsync(fileUri, fileContent);
      alert('Archivo guardado en: ' + fileUri);
      fetchFiles();
      setModalVisible(false);
      setFileName('');
      setFileContent('');
    } catch (error) {
      console.error('Error al acceder al almacenamiento:', error);
    }
  };

  const fetchFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      setFileList(files);
    } catch (error) {
      console.error('Error al leer el directorio:', error);
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop();
    return iconMap[extension.toLowerCase()] || iconMap['default'];
  };

  return (
    <View style={styles.container}>
      <Button title="Acceder al almacenamiento" onPress={handleAccessStorage} />
      <Text style={styles.heading}>Archivos guardados:</Text>
      <FlatList
        data={fileList}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <MaterialCommunityIcons name={getFileIcon(item)} size={24} color="black" />
            <Text style={styles.item}>{item}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  item: {
    fontSize: 16,
    marginLeft: 10,
  },
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

export default StorageAccess;
