import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';

const ModuleOverview = () => {
    return (
        <View style={styles.module}>
            <Text style={styles.title}>Module Title</Text>
            <Text style={styles.subtitle}>Module ID</Text>
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
        fontSize: 16,
        height: 20,
    },
});