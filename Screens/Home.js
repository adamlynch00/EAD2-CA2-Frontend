import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import MyHeader from '../components/MyHeader.js'

const Home = () => {

  const navigation = useNavigation();

  return (
    <View>

      <MyHeader />
      
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({})