import React from 'react'
import { View,Text,StyleSheet,StatusBar } from 'react-native'

const LayoutIngresos = ({ children }) => {
    return( 
        <View  style={styles.container}>
            <StatusBar backgroundColor='#222f3e'/> 
            {children} 
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ffffff",
        padding: 20,
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    }
})

export default LayoutIngresos;
