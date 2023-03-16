import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../context/AuthContext';


const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    

    const navigation = useNavigation();


  return (
    <View>
      <View> 
        
       
        <TextInput value={username} 
        placeholder='Enter username'
        onChangeText={text => setUsername(text)}/>

        <TextInput value={password} 
        placeholder='Enter Password' 
        onChangeText={text => setPassword(text)}
        secureTextEntry/>

        <Button title='login'/>
      </View>
      <Text>Dont have an account</Text>
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

const styles = StyleSheet.create({})