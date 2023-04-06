import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const JoinModule = ({ visible, onClose, onSubmit }) => {
  const [moduleId, setModuleId] = useState('');

  const handleInputChange = (text) => {
    setModuleId(text);
  }

  const handleSubmit = () => {
    onSubmit(moduleId);
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
              value={moduleId}
              onChangeText={handleInputChange}
              placeholder="Module ID"
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

export default JoinModule;

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