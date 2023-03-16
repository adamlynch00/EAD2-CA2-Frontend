import { StyleSheet, Text, View } from 'react-native'
import React, { createContext } from 'react'
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const Register = (username, role, password) => {
        axios.post(`${BASE_URL}/api/auth/register`, {
            username, role, password
        }).then(res => {
            let userInfo = res.data;
            console.log(userInfo);

        }).catch(e=> {
            console.log(`register error ${e}`)
        })

    }
    return(
    <AuthContext.Provider  value={{Register}}>{children}</AuthContext.Provider>
)}

export default AuthContext

const styles = StyleSheet.create({})