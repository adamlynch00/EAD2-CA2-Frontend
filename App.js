import { StyleSheet, Text, View } from 'react-native'
import React, {Suspense} from 'react'
import Navigation from './components/Navigation'
import { AuthProvider } from './context/AuthContext'



const App = () => {
  return (

    <Suspense>

      <AuthProvider>
        <Navigation />
      </AuthProvider>

    </Suspense>
  )
}

export default App

const styles = StyleSheet.create({})