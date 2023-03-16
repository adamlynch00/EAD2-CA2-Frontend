import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../context/AuthContext'

const Register = ({navigation}) => {

    const [role, setRole] = useState(null);
    const [password, setPassword] = useState(null);
    const [username, setUserame] = useState(null);
    

    

    const {Register} = useContext(AuthContext)


    
  return (
    <View>
      <View>
      
        
      <TextInput value={username} 
        placeholder='Enter username'
        onChangeText={text => setUserame(text)}/>

        <TextInput value={role} 
        placeholder='Enter Role'
        onChangeText={text => setRole(text)}/>

        <TextInput value={password} 
        placeholder='Enter Password' 
        onChangeText={text => setPassword(text)}
        secureTextEntry/>

        <Button title='Register'onPress={() => {
            Register(username, password, role)
        }}/>
      </View>
      <Text>Already have an account</Text>
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

const styles = StyleSheet.create({})