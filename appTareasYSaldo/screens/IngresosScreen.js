import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useIsFocused } from '@react-navigation/core';
import IngresosList from '../components/ingresosList';
import GastosList from '../components/gastosList';
import Layout from '../components/LayoutIngresos';

import { getIngresosCount } from '../api'
import { getGastosCount } from '../api'
import { TouchableOpacity } from 'react-native-gesture-handler';

const IngresosScreen = ({ navigation, route }) => {
    let iddeusuario = route.params.params.iduser;
    console.log('iduser: ' + iddeusuario)

    const [gastos, setGastos] = useState([]);
    const [ingresos, setIngresos] = useState([]);
    const [saldoneto, setSaldoneto] = useState([]);
    const [ganancia, setGanancia] = useState([]);
    const [selectIngreso, setSelect] = useState([true]);

    const loadGastos = async () => {
        const data = await getGastosCount(iddeusuario);
        setGastos(data + 0);
    }

    const loadIngresos = async () => {
        const data = await getIngresosCount(iddeusuario);
        setIngresos(data + 0);
    }

    const loadSaldo = async () => {
        const ingre = await getIngresosCount(iddeusuario);
        const gast = await getGastosCount(iddeusuario);
        setSaldoneto(ingre - gast);
        if ((ingre - gast) < 0) {
            setGanancia(false);
        } else {
            setGanancia(true);
        }
        console.log('ganancia: ' + ganancia)
    }

    const isFocus = useIsFocused();
    useEffect(() => {
        loadGastos();
        loadIngresos();
        loadSaldo();
    }, [isFocus])

    return (
        <Layout>
            <View style={styles.containerSaldo}>
                <View>
                    {ganancia ? <Text style={styles.SaldoNetoGanancia}>${saldoneto}</Text> : <Text style={styles.SaldoNetoPerdida}>${saldoneto}</Text>}
                </View>
                <View style={styles.SaldosList}>
                    <Text style={styles.ingresosList} >${ingresos}</Text>
                    <Text style={styles.gastosList} >${gastos}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => { setSelect(true) }}>
                    {selectIngreso ? <Text style={styles.activateNavegacion} >Ingresos</Text> : <Text style={styles.navegacion} >Ingresos</Text>}
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 10}} onPress={() => { setSelect(false) }}>
                {selectIngreso ? <Text style={styles.navegacion} >Gastos</Text> : <Text style={styles.activateNavegacion} >Gastos</Text>}  
                </TouchableOpacity>
            </View>
            {selectIngreso ?
            
                <View style={styles.containerList}>
                    <IngresosList iduser={iddeusuario} />
                </View>
                :
                <View style={styles.containerList}>
                    <GastosList iduser={iddeusuario} />
                </View>}

        </Layout>
    )
}

const styles = StyleSheet.create({
    containerList: {
        width: '100%',
        height: 50,
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        borderColor: 'tomato',
        borderRadius: 20
    },
    containerSaldo: {
        borderColor: '#ffffff',
        width: '100%',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 10
    },
    SaldoNetoGanancia: {
        fontSize: 50,
        color: '#24B160',
    },
    SaldoNetoPerdida: {
        fontSize: 50,
        color: 'red',
    },
    SaldosList: {
        flexDirection: 'row'
    },
    ingresosList: {
        fontSize: 30,
        color: 'green',
        margin: 10
    },
    gastosList: {
        fontSize: 30,
        color: 'red',
        margin: 10
    },
    btnSave: {
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 0,
        backgroundColor: "tomato",
        width: 60,
    },
    btnAddText: {
        backgroundColor: "#ffffff",
        borderRadius: 9,
    },
    btnText: {
        fontSize: 25,
        color: '#ffffff',
        textAlign: 'center',
    },
    navegacion:{
        fontSize: 20,
        color: '#292929',
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#F9F7F7',
        borderRadius: 10
    },
    activateNavegacion:{
        fontSize: 20,
        color: '#292929',
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#E7E4E4',
        borderRadius: 10
    }
})

export default IngresosScreen



