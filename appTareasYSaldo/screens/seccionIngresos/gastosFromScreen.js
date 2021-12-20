import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import Layout from '../../components/seccionTareas/Layout';
import {saveGasto,getGasto,updateGasto} from '../../api';

const gastosFromScreen = ({navigation,route}) => {

    let idusuario = route.params.iduser;

    const [gasto, setGasto] = useState({
        title: '',
        precio: '',
        userid: idusuario
    });

    const [editing, setEditing] = useState(false);

    const handlerChange = (name, value) => setGasto({ ...gasto, [name]: value });

    const handleSubmit = async() => {
        try {
            if(editing){
                await updateGasto(route.params.id,gasto)
            }else{
                await saveGasto(gasto);
            }
            navigation.navigate('TabNavigator', { iduser: idusuario });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(route.params && route.params.id){
            navigation.setOptions({headerTitle: 'Actualizar Gasto'});
            setEditing(true);
            (async ()=>{
                const gasto = await getGasto(route.params.id);
                setGasto({title: gasto.title, precio: gasto.precio})
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
                value={gasto.title}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese el valor"
                placeholderTextColor="#546574"
                onChangeText={(text) => handlerChange('precio', text)}
                value={gasto.precio}
            />
            {
                !editing ? ( 
                    <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Guardar Gasto</Text>
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.btnUpdate} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Actualizar Gasto</Text>
                        </TouchableOpacity>
                    )
            }
        </Layout>
    )
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        marginBottom: 7,
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
        marginBottom: 3,
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
    }

})


export default gastosFromScreen
