import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import IngresosScreen from './seccionIngresos/IngresosScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation, route }) => {
    return (
        <Tab.Navigator 
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Tareas') {
                iconName = 'clipboard';
              } else if (route.name === 'Ingresos') {
                iconName = 'logo-bitcoin';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
          >
            <Tab.Screen name="Tareas" component={HomeScreen} initialParams={ route.params}/>
            <Tab.Screen name="Ingresos" component={IngresosScreen} initialParams={ route} />
        </Tab.Navigator>
    )
}

export default TabNavigator

