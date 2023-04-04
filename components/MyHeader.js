import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

const MyHeader = () => {
    return (
        <View style={styles.container}>

            <Image style={styles.image} source={require("../assets/sh-logo-white-transparent.png")} />

            <TouchableOpacity style={styles.signOutBtn}>
                <Text style={styles.signOutText}>Sign Out</Text>
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