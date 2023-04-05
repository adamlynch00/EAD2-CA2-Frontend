import { StyleSheet, Text,  View } from 'react-native';
import React from 'react';

const Section = (props) => {
    return (
        <View style={styles.section}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.body}>{props.body}</Text>
        </View>
    );
};

export default Section;

const styles = StyleSheet.create({
    section: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    body: {
        fontSize: 16,
        lineHeight: 24,
        flexWrap: 'wrap',
    },
});