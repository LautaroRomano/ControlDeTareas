import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

import Layout from '../components/Layout';
import { saveTask,getTask,updateTask } from '../api';

const TaskFromScreen = ({navigation,route}) => {
    
    let idusuario = route.params.iduser;

    const [task, setTask] = useState({
        title: '',
        description: '',
        userid: idusuario
    });

    const [editing, setEditing] = useState(false);

    const handlerChange = (name, value) => setTask({ ...task, [name]: value });

    const handleSubmit = async() => {
        try {
            if(editing){
                await updateTask(route.params.id,task)
            }else{
                await saveTask(task);
            }
            navigation.navigate('TabNavigator', { iduser: idusuario });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(route.params && route.params.id){
            navigation.setOptions({headerTitle: 'Actualizar tarea'});
            setEditing(true);
            (async ()=>{
                const task = await getTask(route.params.id);
                setTask({title: task.title, description: task.description})
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
                value={task.title}
            />
            <TextInput
                style={styles.input}
                placeholder="Ingrese una descripcion"
                placeholderTextColor="#546574"
                onChangeText={(text) => handlerChange('description', text)}
                value={task.description}
            />
            {
                !editing ? ( 
                    <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Guardar Tarea</Text>
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.btnUpdate} onPress={handleSubmit}>
                            <Text style={styles.btnText}>Actualizar Tarea</Text>
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

export default TaskFromScreen
