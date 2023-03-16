import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'



const App = () => {
  return (

    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  )
}

export default App

const styles = StyleSheet.create({})