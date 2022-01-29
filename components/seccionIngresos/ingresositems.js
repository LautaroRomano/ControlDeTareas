import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import {stylesItems} from '../../styles/itemsStyles'
const styles = stylesItems;

const ingresositems = ({ ingresos, handleDelete, iduser }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'} }>
                <TouchableOpacity  style={{right: 0, maxWidth: '80%'}} onPress={() => navigation.navigate('ingresosFromScreen', { id: ingresos.id, iduser: iduser })}>
                    <Text style={styles.itemTitle}>{ingresos.title}</Text>
                    <Text style={styles.itemDescripcion}>{ingresos.precio}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#ee5253", padding: 5, borderRadius: 5, height:35 }}
                    onPress={() => handleDelete(ingresos.id)}>
                    <Ionicons name={'trash'} size={20} color={'#ffffff'} style={{ padding: 1 }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}


export default ingresositems
