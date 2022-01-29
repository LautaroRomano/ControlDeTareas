import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import TaskList from '../components/seccionTareas/tasksList'
import Layout from '../components/seccionTareas/Layout'

const HomeScreen = ({ navigation, route }) => {
    return (
      <Layout>
        <TaskList/>
        <TouchableOpacity style={styles.btnSave} onPress={() => { navigation.navigate('TaskFromScreen') }}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </Layout>
    );
  
  
  
};


const styles = StyleSheet.create({
  btnSave: {
    paddingVertical: 18,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "tomato",
    width: 70,
    position: 'relative'
  },
  btnText: {
    fontSize: 25,
    color: '#ffffff',
    textAlign: 'center'
  }
})
export default HomeScreen
