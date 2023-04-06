import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CreateModule = ({ visible, onClose, onSubmit }) => {
  const [moduleName, setModuleName] = useState('');

  const handleInputChange = (text) => {
    setModuleName(text);
  }

  const handleSubmit = () => {
    onSubmit(moduleName);
  }

  const handleBackdropPress = () => {
    onClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.container}>
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              value={moduleName}
              onChangeText={handleInputChange}
              placeholder="Module Name"
            />
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CreateModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
});