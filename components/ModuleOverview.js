import { StyleSheet, Text,  View } from 'react-native';
import React from 'react';

const ModuleOverview = (props) => {
    return (
        <View style={styles.module}>
            <Text style={styles.title}>{props.moduleName}</Text>
            <Text style={styles.subtitle}>{props.moduleId}</Text>
        </View>
    );
};

export default ModuleOverview;

const styles = StyleSheet.create({
    module: {
        flex: 1,
        alignItems: "flex-start",
        flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
        backgroundColor: "#FFF",
    },
    title: {
        fontSize: 18,
        height: 20,
        fontWeight: 'bold',
        marginBottom: 8,
        color: "black"
    },
    subtitle: {
        fontSize: 12,
        height: 20,
    },
});