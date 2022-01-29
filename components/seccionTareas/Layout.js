import React from 'react'
import { View,Text,StyleSheet,StatusBar } from 'react-native'

const Layout = ({ children }) => {
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
    }
})

export default Layout;
