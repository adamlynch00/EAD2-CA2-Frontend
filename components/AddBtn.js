import { StyleSheet, Text,  TouchableOpacity } from 'react-native';
import React from 'react';

const AddBtn = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
    )
}

export default AddBtn;

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 100,
        borderWidth: 2.5,
        borderColor: "#398378",
        width: 60,
        height: 60,
      },
    plus: {
        fontSize: 35,
        color: '#398378',
    },
})