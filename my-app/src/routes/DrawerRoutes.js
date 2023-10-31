import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListaTarefas from '../screen/ListaTarefas/ListaTarefas';
import Home from '../screen/Home';
import StackAlunos from '../screen/Alunos/StackAlunos';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (

    <Drawer.Navigator initialRouteName='Alunos'>

      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Lista de Tarefas" component={ListaTarefas} />
      <Drawer.Screen name="Alunos" component={StackAlunos} />

    </Drawer.Navigator>

  );
}
