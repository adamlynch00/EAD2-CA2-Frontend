import React, { useState } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const CreateSection = ({ visible, onClose }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionBody, setSectionBody] = useState('');

  const handleTitleChange = (text) => {
    setSectionTitle(text);
  }

  const handleBodyChange = (text) => {
    setSectionBody(text);
  }

  const handleSubmit = () => {
    onClose(sectionTitle, sectionBody);
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
              value={sectionTitle}
              onChangeText={handleTitleChange}
              placeholder="Section Title"
            />
            <TextInput
              style={styles.input}
              value={sectionBody}
              onChangeText={handleBodyChange}
              placeholder="Section Body"
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

export default CreateSection;

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