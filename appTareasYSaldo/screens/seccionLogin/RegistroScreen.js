import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import {saveUser} from '../../api';
import Layout from '../../components/seccionTareas/Layout';

const RegistroScreen = () => {

  const navigation = useNavigation()

  const [user, setUser] = useState({
    user: '',
    password: '',
    email: ''
  });

  const handleSubmit = async () => {
    try {
      await saveUser(user);

      navigation.navigate('LoginScreen')
    } catch (error) {
      console.log(error);
    }
  }

  const handlerChange = (name, value) => setUser({ ...user, [name]: value });

  return (
    <Layout >
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su usuario"
          placeholderTextColor="#546574"
          onChangeText={(text) => handlerChange('user', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#546574"
          onChangeText={(text) => handlerChange('password', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su Email"
          placeholderTextColor="#546574"
          onChangeText={(text) => handlerChange('email', text)}
        />
        <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
          <Text style={styles.btnText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

    </Layout>
  )
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: 'tomato',
    height: 35,
    color: '#292929',
    padding: 4,
    textAlign: 'center',
    borderRadius: 5,
  },
  btnSave: {
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "tomato",
    width: '90%'
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center'
  },
  view: {
    alignItems: 'center',
    width: '100%',
    marginTop: 130
  },
  textRegistrarse: {
    color: "tomato",
    marginTop: 15,
    fontSize: 15
  }

})

export default RegistroScreen
