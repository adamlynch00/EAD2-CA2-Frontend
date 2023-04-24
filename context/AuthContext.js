import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const Register = (username, role, password) => {
        const data = {
            username: username,
            password: password,
            role: role
        }

        axios.post(`http://studenthub.azurewebsites.net/api/auth/register`, data)
            .then( (res) => {
                console.log(res);
                console.log('success')
                
            })
            .catch( (err) => {
                console.log(`register error ${err}`)
            });
    }

    return(
    <AuthContext.Provider value={{Register}}>{children}</AuthContext.Provider>
)}

export default AuthContext

const styles = StyleSheet.create({})