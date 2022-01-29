import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import TaskFromScreen from './screens/TaskFromScreen'
import TabNavigator from './screens/TabNavigator'

import ingresosFromScreen from './screens/seccionIngresos/ingresosFromScreen'
import gastosFromScreen from './screens/seccionIngresos/gastosFromScreen'
import deudasFromScreen from './screens/seccionIngresos/deudasFromScreen'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator}
          options={({ navigation }) => ({
            title: 'Bienvenido',
            headerStyle: { backgroundColor: '#F1F1F1' },
            headerTitleStyle: { color: 'tomato' },
          })} />
        <Stack.Screen name="ingresosFromScreen" component={ingresosFromScreen}
          options={({ navigation }) => ({
            title: 'Ingresos',
            headerStyle: { backgroundColor: '#F1F1F1' },
            headerTitleStyle: { color: 'tomato' },
          })} />
        <Stack.Screen name="gastosFromScreen" component={gastosFromScreen}
          options={({ navigation }) => ({
            title: 'Ingresos',
            headerStyle: { backgroundColor: '#F1F1F1' },
            headerTitleStyle: { color: 'tomato' },
          })} />
        <Stack.Screen name="deudasFromScreen" component={deudasFromScreen}
          options={({ navigation }) => ({
            title: 'Ingresos',
            headerStyle: { backgroundColor: '#F1F1F1' },
            headerTitleStyle: { color: 'tomato' },
          })} />
        <Stack.Screen name="TaskFromScreen" component={TaskFromScreen}
          options={{
            title: 'Crea una nueva tarea',
            headerStyle: {
              backgroundColor: "#222f3e"
            },
            headerTitleStyle: { color: '#F1F1F1' },
            headerTintColor: "tomato"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App