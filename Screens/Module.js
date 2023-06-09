import MyHeader from '../components/MyHeader.js';
import { StyleSheet, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { React, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Section from '../components/Section.js';
import {Dimensions} from 'react-native';
import AddBtn from '../components/AddBtn.js';
import CreateSection from '../components/CreateSection.js';

import { BASE_URL } from '../config';

const Module = ({ route }) => {
  const[accessToken, setAccessToken] = useState('');
  const[role, setRole] = useState('');
  const[module, setModule] = useState(null);
  const[sections, setSections] = useState([]);
  const[loading, setLoading] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionBody, setSectionBody] = useState('');

  const { moduleId } = route.params;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData () {
    setLoading(true);

    const accessToken = await AsyncStorage.getItem("accessToken");
    const role = await AsyncStorage.getItem("role");
    
    setAccessToken(accessToken);
    setRole(role);
    
    await axios.get(`${BASE_URL}/module/${moduleId}`, {
        headers: {
          Authorization: `bearer ${accessToken}`
        }
      })
      .then( (res) => {
        if (res.status === 200) {
            setModule(res.data);

            const sections = res.data.sections.$values;

            const sortedSections = sections.sort((a, b) => {
              return new Date(a.dueDate) - new Date(b.dueDate);
            });

            setSections(sortedSections);
        }
        else {
            console.log(`Error - Status ${res.status}`);
        }
      })
      .catch( (err) => {
        console.log(err);
      })

    setLoading(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleModalSubmit = (title, body) => {
    setSectionTitle(title);
    setSectionBody(body);

    const data = {
      title: title,
      body: body,
      moduleId: moduleId
    }
    
    axios.post(`${BASE_URL}/module/create-section`, data, {
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

    toggleModal();
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
        {module !== null ? <Text style={styles.moduleName}>{module.name}</Text> : null}

        <View style={styles.itemsWrapper}>
          <View style={styles.items}>
            {sections.map((item, index) => (
              <Section key={index} title={item.title} body={item.body} date={item.dueDate}></Section>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {role !== null && role === "1" ? 
        <View style={styles.addBtn}>
            <AddBtn onPress={toggleModal} />
        </View>
        :
        null
      }

      <CreateSection visible={modalVisible} onClose={toggleModal} onSubmit={handleModalSubmit} />

    </View>
  )
}

export default Module;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EEE",
        height: "100%"
    },
    itemsWrapper: {
        paddingHorizontal: 20,
        marginTop: -15
    },
    items: {
        marginTop: 30
    },
    moduleName: {
        fontSize: 24,
        paddingTop: 14,
        paddingLeft: 14,
        fontWeight: "bold"
    },
    addBtn: {
        position: 'absolute',
        left: Dimensions.get('window').width - 70,
        top: "90%",
        width: '100%',
    }
})