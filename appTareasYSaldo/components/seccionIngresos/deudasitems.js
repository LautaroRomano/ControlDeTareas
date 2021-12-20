import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { stylesItems } from '../../styles/itemsStyles'
import { verificarMesBoolean } from '../../funciones/verificarSiPagoLaDeudaEsteMes';
const styles = stylesItems;

const deudasitems = ({ deudas, iduser, handleDelete, handlePagarMes }) => {
    const navigation = useNavigation()
    let pagoEsteMes = verificarMesBoolean(deudas);

    return (
        <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ right: 0, maxWidth: '80%' }} onPress={() => navigation.navigate('deudasFromScreen', { id: deudas.id, iduser: iduser })}>
                    <Text style={styles.itemTitle}>{deudas.title}</Text>
                    <Text style={styles.itemDescripcion}>Pagar: {deudas.precio}</Text>
                    <Text style={styles.itemDescripcion}>Fecha de pago: {deudas.fecpago}</Text>
                    <Text style={styles.itemDescripcion}>Meses restante: {deudas.cantmeses}</Text>
                </TouchableOpacity>
                <View style={{ textAlign: 'center', alignItems: 'center', width: '23%'}}>
                    {!pagoEsteMes &&
                        <TouchableOpacity style={{ backgroundColor: "#ee5253", padding: 5, borderRadius: 5, height: 35, margin: 2 }} onPress={() => handlePagarMes(deudas)}>
                            <Text style={{ color: '#fff' }}>Pagado</Text>
                        </TouchableOpacity>}

                    <TouchableOpacity style={{ backgroundColor: "#ee5253", padding: 5, borderRadius: 5, height: 35, margin: 2, width: '50%' }}
                        onPress={() => handleDelete(deudas.id)}>
                        <Ionicons name={'trash'} size={20} color={'#ffffff'} style={{ padding: 1 }} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default deudasitems
