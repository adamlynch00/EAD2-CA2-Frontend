import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const MyHeader = () => {
   
    const navigation = useNavigation();
    

    const handleLogOut = async () => {
        await AsyncStorage.clear();
        navigation.navigate("Login");
    }

    

    
    return (
        <View style={styles.container}>

            <Image style={styles.image} source={require("../assets/sh-logo-white-transparent.png")} />

            <TouchableOpacity style={styles.signOutBtn} onPress={handleLogOut}>
                <Text style={styles.signOutText}>Sign out</Text>
                <Icon style={styles.signOutIcon} name="log-out-outline" size={30} color="#FFF" />
            </TouchableOpacity>

            

        </View>
    );
};

export default MyHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 22,
        backgroundColor: "#398378",
    },
    image: {
        width: "40%",
        resizeMode: "contain",
        height: 50,
        alignSelf: "center",
    },
    signOutBtn: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderColor: "#FFF",
        padding: 4,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderRadius: 8
    },
    signOutText: {
        color: "#FFF",
        fontSize: 16,
        marginRight: 6,
        marginTop: 2
    },
    signOutIcon: {
        fontSize: 25
    }
});