import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/core';
import Ionicons from '@expo/vector-icons/Ionicons';

import Gastositems from './gastositems';
import { getGastos, deleteGasto } from '../api';

import { useNavigation } from '@react-navigation/native';

const gastosList = ({ iduser }) => {

    const navigation = useNavigation();

    const [gastos, setGastos] = useState([]);

    const isFocus = useIsFocused();

    const loadGastos = async () => {
        const data = await getGastos(iduser);
        setGastos(data);
    }

    //cuando cargue el home screen esto sera lo primero que se ejecutara
    useEffect(() => {
        loadGastos();
    }, [isFocus])

    const handleDelete = async (id) => {
        await deleteGasto(id);
        await loadGastos();
    }

    const renderItem = ({ item }) => {
        return <Gastositems gastos={item} iduser={iduser} handleDelete={handleDelete} />;
    };

    return (
        <View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
            <FlatList
                style={{ width: '100%' }}
                data={gastos}
                keyExtractor={(item) => item.id + ''}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.btnSave} onPress={() => { navigation.navigate('gastosFromScreen', { iduser: iduser }) }}>
                <Text style={styles.btnText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        alignItems: 'center',
        color: "#222",
        padding: 10,
    },
    btnSave: {
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 0,
        backgroundColor: "tomato",
        width: 60,
        position: 'absolute',
        top: '93%'
    },
    btnAddText: {
        backgroundColor: "#ffffff",
        borderRadius: 9,
    },
    btnText: {
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center'
    }
}

)

export default gastosList
