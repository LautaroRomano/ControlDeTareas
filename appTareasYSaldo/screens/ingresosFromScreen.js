import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import Layout from '../components/Layout';
import {saveIngreso,getIngreso,updateIngreso} from '../api';

const ingresosFromScreen = ({navigation,route}) => {

    let idusuario = route.params.iduser;

    console.log(route);

    const [ingreso, setIngreso] = useState({ 
        title: '',
        precio: '',
        userid: idusuario
    });

    const [editing, setEditing] = useState(false);

    const handlerChange = (name, value) => setIngreso({ ...ingreso, [name]: value });

    const handleSubmit = async() => {
        try {
            if(editing){
                await updateIngreso(route.params.id,ingreso)
            }else{
                await saveIngreso(ingreso);
            }
            navigation.navigate('TabNavigator', { iduser: idusuario });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(route.params && route.params.id){
            navigation.setOptions({headerTitle: 'Actualizar Ingreso'});
            setEditing(true);
            (async ()=>{
                const ingreso = await getIngreso(route.params.id);
                setIngreso({title: ingreso.title, precio: ingreso.precio})
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
                value={ingreso.title}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese el valor"
                placeholderTextColor="#546574"
                onChangeText={(text) => handlerChange('precio', text)}
                value={ingreso.description}
            />
            {
                !editing ? ( 
                    <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Guardar Ingreso</Text>
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.btnUpdate} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Actualizar Ingreso</Text>
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


export default ingresosFromScreen
