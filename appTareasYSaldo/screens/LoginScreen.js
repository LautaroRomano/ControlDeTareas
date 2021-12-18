import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/core';

import { getUsers } from '../api';
import Layout from '../components/Layout';

import { saveJSON, getJSON } from '../asyncStoreControl/aStorageController'

let ingreso = false;

const LoginScreen = () => {

  const isFocus = useIsFocused();

  const [usuarios, setusuarios] = useState([]);

  const traerusuarios = async () => {
    const data = await getUsers();
    setusuarios(data);
  }

  const traerusuariosStorage = async () => {
    const data = await getJSON('@userkey');
    if (data !== null) {
      ingreso = true;
      navigation.navigate('TabNavigator', { iduser: data.id });
    }
  }

  useEffect(() => {
    traerusuarios();
  }, [isFocus])

  useEffect(() => {
    traerusuariosStorage();
  }, [])


  const navigation = useNavigation()

  const [user, setUser] = useState({
    user: '',
    password: ''
  });

  const handlerChange = (name, value) => setUser({ ...user, [name]: value });

  return (
    <Layout >
      <View style={styles.view}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su usuario"
          placeholderTextColor="#546574"
          onChangeText={async (text) => { handlerChange('user', text) }}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingrese su contraseña"
          placeholderTextColor="#546574"
          onChangeText={async (text) => { handlerChange('password', text) }}
        />
        <TouchableOpacity style={styles.btnSave} onPress={() => {
          if (usuarios) {
            for (let i = 0; i < usuarios.length; i++) {
              if (user.user === usuarios[i].user && user.password === usuarios[i].password) {
                ingreso = true;
                saveJSON(usuarios[i], '@userkey');
                navigation.navigate('TabNavigator', { iduser: usuarios[i].id });
              }
            }
            if (!ingreso) {
              Alert.alert('Ocurrio un error', 'Puede que los datos ingresados sean invalidos, intente nuevamente');
            }
          } else {
            Alert.alert('Error al conectar con la base de datos');
          }
        }}>
          <Text style={styles.btnText}>Ingresar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.navigate('RegistroScreen');
        }}>
          <Text style={styles.textRegistrarse}>Si no tienes usuario registrate aqui</Text>
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

export default LoginScreen
