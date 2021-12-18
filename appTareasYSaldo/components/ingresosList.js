import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/core';
import Ionicons from '@expo/vector-icons/Ionicons';

import Ingresositems from './ingresositems';
import { getIngresos, deleteIngreso } from '../api';

import { useNavigation } from '@react-navigation/native';


const ingresosList = ({ iduser }) => {

    const navigation = useNavigation();

    const [ingresos, setIngresos] = useState([]);

    const isFocus = useIsFocused();

    const loadIngresos = async () => {
        const data = await getIngresos(iduser);
        setIngresos(data);
    }

    //cuando cargue el home screen esto sera lo primero que se ejecutara
    useEffect(() => {
        loadIngresos();
    }, [isFocus])

    const handleDelete = async (id) => {
        await deleteIngreso(id);
        await loadIngresos();
    }

    const renderItem = ({ item }) => {
        return <Ingresositems ingresos={item} iduser={iduser} handleDelete={handleDelete} />;
    };

    return (
        <View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
            <FlatList
                style={{ width: '100%' }}
                data={ingresos}
                keyExtractor={(item) => item.id + ''}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.btnSave} onPress={() => { navigation.navigate('ingresosFromScreen', { iduser: iduser }) }}>
                <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({

    btnSave: {
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 0,
        backgroundColor: "tomato",
        width: 60,
        position: 'absolute',
        top: '93%'
    },
    btnText: {
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center',
    }
}

)

export default ingresosList
