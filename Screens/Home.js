import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { React, useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

import MyHeader from '../components/MyHeader.js'
import ModuleOverview from '../components/ModuleOverview.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '../config';

const Home = () => {
  const[accessToken, setAccessToken] = useState('');
  const[role, setRole] = useState('');
  const[loading, setLoading] = useState();
  const[modules, setModules] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData () {
    setLoading(true);
    const accessToken = await AsyncStorage.getItem("accessToken");
    const role = await AsyncStorage.getItem("role");
    
    setAccessToken(accessToken);
    setRole(role);

    if (role && accessToken) {
      if (role === "0") {
        await getJoinedModules(accessToken);
      }
      else if (role === "1") {
        await getOwnedModules(accessToken);
      }
    }
    setLoading(false);
  };

  const getJoinedModules = async(token) => {
    await axios.get(`${BASE_URL}/user/joined-modules`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
    .then( (res) => {
      if (res.status === 200) {
        setModules(res.data);
      }
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  const getOwnedModules = async(token) => {
    await axios.get(`${BASE_URL}/user/owned-modules`, {
      headers: {
        Authorization: `bearer ${token}`
      }
    })
    .then( (res) => {
      if (res.status === 200) {
        setModules(res.data);
      }
    })
    .catch( (err) => {
      console.log(err);
    })
  }

  const handleModuleSelect = (moduleId) => {
    navigation.navigate("Module", { "moduleId": moduleId });
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    
      <View style={styles.container}>

        <MyHeader />

        <ScrollView 
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.modulesWrapper}>
            <View style={styles.modules}>
              {modules.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleModuleSelect(item.moduleId)}>
                  <ModuleOverview moduleName={item.name} moduleId={item.moduleId} />
                </TouchableOpacity>
              ))}
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