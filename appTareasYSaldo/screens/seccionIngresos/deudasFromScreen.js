import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import Layout from '../../components/seccionTareas/Layout';
import { saveDeuda, getDeuda, updateDeuda } from '../../api';

const deudasFromScreen = ({ navigation, route }) => {

    let idusuario = route.params.iduser;

    const [deuda, setDeuda] = useState({
        title: '',
        precio: '',
        userid: idusuario,
        fecpago: '',
        fecinicio: new Date(),
        cantmeses: '',
        ultmespagado: ''
    });
    console.log(deuda);

    const [editing, setEditing] = useState(false);

    const handlerChange = (name, value) => setDeuda({ ...deuda, [name]: value });

    const handleSubmit = async () => {
        try {
            if (editing) {
                await updateDeuda(route.params.id, deuda)
            } else {
                await saveDeuda(deuda);
            }
            navigation.navigate('TabNavigator', { iduser: idusuario });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (route.params && route.params.id) {
            navigation.setOptions({ headerTitle: 'Actualizar Deuda' });
            setEditing(true);
            (async () => {
                const deuda = await getDeuda(route.params.id);
                setDeuda({ title: deuda.title, precio: deuda.precio, userid: deuda.userid, fecpago: deuda.fecpago, fecinicio: deuda.fecinicio, cantmeses: deuda.cantmeses, ultmespagado: deuda.ultmespagado })
            })();
        }
    }, []);

    return (
        <Layout>
            <TextInput
                style={styles.input}
                placeholder="Ingrese un titulo"
                placeholderTextColor="#546574"
                onChangeText={(text) => handlerChange('title', text)}
                value={deuda.title}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese el valor"
                placeholderTextColor="#546574"
                onChangeText={(text) => handlerChange('precio', text)}
                value={deuda.precio}
            />

            <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                    style={styles.inputCantMeses}
                    placeholder="Dia de pago"
                    placeholderTextColor="#546574"
                    onChangeText={(text) => handlerChange('fecpago', text)}
                    value={deuda.fecpago}
                />
                <TextInput
                    style={styles.inputCantMeses}
                    placeholder="Cantidad de meses"
                    placeholderTextColor="#546574"
                    onChangeText={(text) => handlerChange('cantmeses', text)}
                    value={deuda.cantmeses.toString()}
                />
            </View>

            {
                !editing ? (
                    <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Guardar Deuda</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.btnUpdate} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Actualizar Deuda</Text>
                    </TouchableOpacity>
                )
            }
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        marginBottom: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'tomato',
        height: 35,
        color: '#292929',
        padding: 4,
        textAlign: 'center',
        borderRadius: 5
    },
    btnSave: {
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: "tomato",
        width: '90%'
    },
    btnText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    btnUpdate: {
        padding: 10,
        paddingBottom: 10,
        borderRadius: 5,
        marginBottom: 3,
        backgroundColor: "#e58e26",
        width: "90%",
    },
    viewSelectDate: {
        width: "100%",
        marginBottom: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'tomato',
        height: 35,
        padding: 4,
        textAlign: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textSelectDate: {
        color: '#111111',
        textAlign: 'center',
    },
    inputCantMeses: {
        width: "50%",
        marginBottom: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'tomato',
        height: 35,
        color: '#292929',
        padding: 4,
        textAlign: 'center',
        borderRadius: 5
    }

})


export default deudasFromScreen
