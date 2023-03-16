import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation();
  return (
    <View>
      <Text>Home</Text>

      <View>
        <Pressable onPress={() =>{
              navigation.navigate("Login")
            }}>
                <Text>Login</Text>

        </Pressable>
      </View>

      <View>
        <Pressable onPress={() =>{
              navigation.navigate("Register")
            }}>
                <Text>Login</Text>

        </Pressable>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})