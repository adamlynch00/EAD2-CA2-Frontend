import MyHeader from '../components/MyHeader.js'
import { StyleSheet, Text, View } from 'react-native'

const Module = ({ route }) => {
  const { moduleId } = route.params;

  return (
    <View>
      <MyHeader />
      <Text>{moduleId}</Text>
    </View>
  )
}

export default Module;

const styles = StyleSheet.create({

})