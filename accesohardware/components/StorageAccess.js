import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import CreateFileModal from './CreateFileModal';
import ViewFileModal from './ViewFileModal';

const iconMap = {
  // ...
};

const StorageAccess = () => {
  const [fileList, setFileList] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileContent, setSelectedFileContent] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
      setFileList(files);
    } catch (error) {
      console.error('Error al leer el directorio:', error);
    }
  };

  const getFileIcon = (filename) => {
    // ...
  };

  const handleCreateFile = async () => {
    setCreateModalVisible(true);
  };

  const handleFilePress = async (fileName) => {
    setSelectedFileName(fileName);
    try {
      const fileContent = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${fileName}`);
      setSelectedFileContent(fileContent);
      setViewModalVisible(true);
    } catch (error) {
      console.error('Error al leer el archivo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Acceder al almacenamiento" onPress={() => setCreateModalVisible(true)} />
      <Button title="Crear archivo" onPress={handleCreateFile} />
      <Text style={styles.heading}>Archivos guardados:</Text>
      <FlatList
        data={fileList}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleFilePress(item)} style={styles.itemContainer}>
            <MaterialCommunityIcons name={getFileIcon(item)} size={24} color="black" />
            <Text style={styles.item}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <CreateFileModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        fetchFiles={fetchFiles}
      />
      <ViewFileModal
        visible={viewModalVisible}
        setVisible={setViewModalVisible}
        fileName={selectedFileName}
        fileContent={selectedFileContent}
      />
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
