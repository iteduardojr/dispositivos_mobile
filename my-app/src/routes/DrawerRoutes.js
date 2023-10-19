import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListaTarefas from '../screen/ListaTarefas/ListaTarefas';
import Home from '../screen/Home'; 

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
   
      <Drawer.Navigator initialRouteName="Lista de Tarefas">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Lista de Tarefas" component={ListaTarefas} />
      </Drawer.Navigator>
    
  );
}
