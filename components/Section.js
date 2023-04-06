import { StyleSheet, Text,  View } from 'react-native';
import React from 'react';

const Section = (props) => {

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <View style={styles.section}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.body}>{props.body}</Text>
            <Text style={styles.date}>Due: {props.date.substring(0, 10)}</Text>
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
    date: {
        fontSize: 14,
        lineHeight: 24,
        alignSelf: "flex-end"
    },
});