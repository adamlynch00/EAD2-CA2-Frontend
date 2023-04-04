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

        axios.post(`http://10.0.2.2:3000/api/auth/register`, data)
            .then( (res) => {
                console.log(res);
            })
            .catch( (err) => {
                console.log(`register error ${err}`)
            });
    }

    const SendLogin = async (username, password) => {
        const data = {
            "username": username,
            "password": password
        };
  
        console.log(data);
  
        axios.post(`http://10.0.2.2:3000/api/auth/login`, data)
            .then( (res) => {
                console.log(res.data);
            })
            .catch( (err) => {
                console.log(err.request);
            });
      }

    return(
    <AuthContext.Provider value={{Register}}>{children}</AuthContext.Provider>
)}

export default AuthContext

const styles = StyleSheet.create({})