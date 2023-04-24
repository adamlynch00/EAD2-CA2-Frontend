import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native'
import { React, useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import {Dimensions} from 'react-native';

import MyHeader from '../components/MyHeader.js';
import AddBtn from '../components/AddBtn.js';
import ModuleOverview from '../components/ModuleOverview.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '../config';
import CreateModule from '../components/CreateModule.js';
import JoinModule from '../components/JoinModule.js';

import * as localization from 'expo-localization'
import { I18n } from 'i18n-js';


const translations = {

  en: {
    Signout:"Sign out"
  },

  ja: {
    Signout:"サインアウト" 

  }
}

const i18n =  new I18n(translations);

i18n.locale = localization.locale;

i18n.enableFallback = true;

const Home = () => {
  const[accessToken, setAccessToken] = useState('');
  const[role, setRole] = useState('');
  const[loading, setLoading] = useState();
  const[modules, setModules] = useState([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [modalName, setModuleName] = useState('');
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const [moduleId, setModuleId] = useState('');

  const navigation = useNavigation();

  const [locale, setLocale] = useState(i18n.locale)

  const changeLocale = (locale) => {
      i18n.locale = locale;
      setLocale(locale)
    }

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

  const toggleCreateModal = () => {
    setCreateModalVisible(!createModalVisible);
  }

  const handleCreateModalSubmit = (value) => {
    setModuleName(value);
    
    const data = {
      Name: value
    }

    axios.post(`${BASE_URL}/module/create`, data, {
      headers: {
        Authorization: `bearer ${accessToken}`
      }
    })
    .then( () => {
      loadData();
    })
    .catch( (err) => {
      console.log(err);
    })

    toggleCreateModal();
  }

  const toggleJoinModal = () => {
    setJoinModalVisible(!joinModalVisible);
  }

  const handleJoinModalSubmit = (value) => {
    setModuleId(value);
    
    const data = {
      moduleID: value
    }

    axios.post(`${BASE_URL}/module/join`, data, {
      headers: {
        Authorization: `bearer ${accessToken}`
      }
    })
    .then( () => {
      loadData();
    })
    .catch( (err) => {
      console.log(err);
    })

    toggleJoinModal();
  }

  const handleAddBtnPress = () => {
    if (role === "0") {
      toggleJoinModal();
    }
    else if (role === "1") {
      toggleCreateModal();
    }
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

        <View style={styles.addBtn}>
          <AddBtn onPress={() => handleAddBtnPress()} />
        </View>

        <CreateModule visible={createModalVisible} onClose={toggleCreateModal} onSubmit={handleCreateModalSubmit} />

        <JoinModule visible={joinModalVisible} onClose={toggleJoinModal} onSubmit={handleJoinModalSubmit} />

        

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
  },
  addBtn: {
    position: 'absolute',
    left: Dimensions.get('window').width - 70,
    top: "90%",
    width: '100%',
  }
})