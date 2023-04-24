import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../context/AuthContext'
import SelectDropdown from 'react-native-select-dropdown'
import { BASE_URL } from '../config';
import axios from 'axios';

import * as localization from 'expo-localization'
import { I18n } from 'i18n-js';


const translations = {

    en: {
      Role: "Role",
      Username:"Username",
      Password:"Password",
      Register:"Register",
      Alreadyhaveanaccount:"Already have an account?",
      Login:"Login"


    },
  
    ja: {
      Role: "役割",
      Username:"ユーザー名",
      Password:"パスワード",
      Register:"登録",
      Alreadyhaveanaccount:"すでにアカウントをお持ちですか?",
      Login:"ログイン" 
  
    }
  }

const i18n =  new I18n(translations);

i18n.locale = localization.locale;
  
i18n.enableFallback = true;

const Register = ({navigation}) => {

    const [role, setRole] = useState(0);
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const roles = [ "Student", "Teacher" ]

    const {Register} = useContext(AuthContext)

    const [locale, setLocale] = useState(i18n.locale)

    const changeLocale = (locale) => {
      i18n.locale = locale;
      setLocale(locale)
    }

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
                console.log('success')
                navigation.navigate("Login")
              }
          })
          .catch( (err) => {
              console.log(err.response.data);
              console.log(`error`, err)
          });
    }
  
  return (
    <View style={styles.container}>

      <Image style={styles.image} source={require("../assets/sh-logo-transparent.png")} />

      <Text style={{textAlign:"center", alignContent:"center", alignItems:"center"}}>
      {i18n.t('Username')}
        </Text>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={username} 
          placeholder='Enter username'
          onChangeText={text => setUsername(text)}
        />
      </View>

      <View>
        <Text style={{textAlign:"center", alignContent:"center", alignItems:"center"}}>
        {i18n.t('Role')}
        </Text>
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

      
        <Text style={{textAlign:"center", alignContent:"center", alignItems:"center"}}>
        {i18n.t('Password')}
        </Text>

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
        <Text style={styles.registerText}>{i18n.t('Register')}</Text>
      </TouchableOpacity>

      <Text>{i18n.t('Alreadyhaveanaccount')}</Text>
      <View>
        <Pressable onPress={() =>{
              navigation.navigate("Login")
            }}>
                <Text>{i18n.t('Login')}</Text>
        </Pressable>
      </View>

      <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", alignSelf: "center" }}>
                    <TouchableOpacity onPress={() => changeLocale('ja')}>
                        <Text>
                            Japanese
                        </Text>
                    </TouchableOpacity>



                    <TouchableOpacity onPress={() => changeLocale('en')}>
                        <Text>
                            English
                        </Text>
                    </TouchableOpacity>

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
    height: 120
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