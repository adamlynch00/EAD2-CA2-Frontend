import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';


const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const navigation = useNavigation();

    const HandleLogin = async (username, password) => {
      const data = {
          "username": username,
          "password": password
      };

      axios.post(`${BASE_URL}/auth/login`, data)
          .then( (res) => {
              if (res.status === 200) {
                AsyncStorage.setItem("AccessToken", res.data);
                navigation.navigate("Home");
              }
              else {
                console.log("Failed to apply access token - Status " + result.status)
              }
          })
          .catch( (err) => {
              console.log(err.response.data);
          });
    }

  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("../assets/sh-logo-transparent.png")} />

      <View style={styles.inputView}>
        <TextInput 
          style={styles.TextInput}
          value={username} 
          placeholder='Enter username'
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput 
          style={styles.TextInput}
          value={password} 
          placeholder='Enter Password' 
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      
      <TouchableOpacity style={styles.loginBtn}
        onPress={() => HandleLogin(username, password)}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text>Dont have an account?c</Text>
      <View>
        <Pressable onPress={() =>{
              navigation.navigate("Register")
            }}>
                <Text>Register</Text>

        </Pressable>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    borderColor: "#BBB",
    borderWidth: 1
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 15,
    textAlignVertical: "center",
    textAlign: "center"
  },
  image: {
    width: "60%",
    resizeMode: "contain",
    height: 150
  },
  container: {
    flex: 1,
    backgroundColor: "#EEE",
    alignItems: "center",
    paddingTop: "15%"
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#398378",
    borderColor: "#BBB",
    borderWidth: 1,
    marginBottom: 20
  },
  loginText: {
    color: "#FFF",
    fontWeight: "bold"
  }
})