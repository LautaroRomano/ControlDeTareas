import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/core';
import Deudasitems from './deudasitems';

import { getJSON, deleteJSON, updateJSON, saveJSON } from '../../asyncStoreControl/aStorageController';

import { useNavigation } from '@react-navigation/native';
import { verificarMes } from '../../funciones/verificarSiPagoLaDeudaEsteMes';

const deudasList = () => {

    const navigation = useNavigation();

    const [deudas, setDeudas] = useState([]);
    const [btnselectdeuda, setBtnselectdeuda] = useState(false);


    const isFocus = useIsFocused();

    const loadDeudas = async (verDeudasPagadas) => {
        const data = await getJSON('@deudasKey');
        const deudas = await verificarMes(data, verDeudasPagadas)
        setDeudas(deudas);
        setBtnselectdeuda(verDeudasPagadas)
    }

    //cuando cargue el home screen esto sera lo primero que se ejecutara
    useEffect(() => {
        loadDeudas(true);
    }, [isFocus])

    const handleDelete = async (id) => {
        await deleteJSON('@deudasKey', id);
        await loadDeudas(true);
    }

    const handlePagarMes = async (deuda) => {
        const fecha = new Date();
        deuda.ultmespagado = fecha;
        deuda.cantmeses -= 1;
        if (deuda.cantmeses <= 0) deleteJSON('@deudasKey', deuda.id)
        else await updateJSON('@deudasKey', deuda, deuda.id);
        await loadDeudas(true);

        let gasto = { 
            id: '',
            title: 'deuda: '+ deuda.title, 
            precio: deuda.precio
        }

        await saveJSON('@gastosKey',gasto);

    }

    const renderItem = ({ item }) => {
        return <Deudasitems deudas={item} handleDelete={handleDelete} handlePagarMes={handlePagarMes} />;
    };

    return (
        <View style={{ alignItems: 'center', width: '100%', height: '100%' }}>
            {btnselectdeuda ?
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: "#999999", padding: 5, borderRadius: 5, height: 35, marginHorizontal: 15 }} onPress={async () => { await loadDeudas(false); }}>
                        <Text style={{ color: '#fff' }}>Deudas a pagar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#555", padding: 5, borderRadius: 5, height: 35, marginHorizontal: 15 }} onPress={async () => { await loadDeudas(true); }}>
                        <Text style={{ color: '#fff' }}>Deudas pagadas</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ backgroundColor: "#555", padding: 5, borderRadius: 5, height: 35, marginHorizontal: 15 }} onPress={async () => { await loadDeudas(false); }}>
                        <Text style={{ color: '#fff' }}>Deudas a pagar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: "#999999", padding: 5, borderRadius: 5, height: 35, marginHorizontal: 15 }} onPress={async () => { await loadDeudas(true); }}>
                        <Text style={{ color: '#fff' }}>Deudas pagadas</Text>
                    </TouchableOpacity>
                </View>
            }

            <FlatList
                style={{ width: '100%' }}
                data={deudas}
                keyExtractor={(item) => item.id + ''}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.btnSave} onPress={() => { navigation.navigate('deudasFromScreen') }}>
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

export default deudasList
