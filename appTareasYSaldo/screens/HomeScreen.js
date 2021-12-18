import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import TaskList from '../components/tasksList'
import Layout from '../components/Layout'

const HomeScreen = ({ navigation, route }) => {
  
  let iddeusuario = -1;

  if(route.params && route.params.iduser){

    iddeusuario = route.params.iduser;
    return (
      <Layout>
        <TaskList iduser={iddeusuario} />
        <TouchableOpacity style={styles.btnSave} onPress={() => { navigation.navigate('TaskFromScreen', { iduser: iddeusuario }) }}>
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </Layout>
    );
  }else{
    return (
      <Text>Ocurrio un error</Text>
    );
  }
  
  
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
