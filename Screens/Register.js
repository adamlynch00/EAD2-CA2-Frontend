import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../context/AuthContext'
import SelectDropdown from 'react-native-select-dropdown'
import { BASE_URL } from '../config';
import axios from 'axios';

const Register = ({navigation}) => {

    const [role, setRole] = useState(0);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const roles = [ "Student", "Teacher" ]

    const {Register} = useContext(AuthContext)

    const HandleRegister = async (username, password, role) => {
      const data = {
          "username": username,
          "password": password,
          "role": role
      };

      axios.post(`${BASE_URL}/auth/register`, data)
          .then( (res) => {
              if (res.status === 201) {
                console.log(res.data);
                navigation.navigate("Login")
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

      <View>
        <SelectDropdown
          data={roles}
          buttonStyle={styles.inputView}
          buttonTextStyle={styles.TextInput}
          defaultValueByIndex={0}
          onSelect={ (selectedItem, index) => setRole(index)}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem
          }}
          rowTextForSelection={item => {
            return item
          }}
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

      <TouchableOpacity style={styles.registerBtn}
        onPress={() => HandleRegister(username, password, role)}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <Text>Already have an account?</Text>
      <View>
        <Pressable onPress={() =>{
              navigation.navigate("Login")
            }}>
                <Text>Login</Text>
        </Pressable>
      </View>
      
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "#FFF",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
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
  registerBtn: {
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
  registerText: {
    color: "#FFF",
    fontWeight: "bold"
  }
})