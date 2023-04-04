import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import MyHeader from '../components/MyHeader.js'
import ModuleOverview from '../components/ModuleOverview.js';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {

  const navigation = useNavigation();

  return (
    
      <View style={styles.container}>

        <MyHeader />

        <ScrollView 
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps='handled'
        >

        <View style={styles.modulesWrapper}>
          <View style={styles.modules}>
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
            <ModuleOverview />
          </View>
        </View>

        </ScrollView>

      </View>
    
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
    height: "100%"
  },
  modulesWrapper: {
    paddingHorizontal: 20,
  },
  modules: {
    marginTop: 30
  }
})