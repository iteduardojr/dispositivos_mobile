import { createStackNavigator } from '@react-navigation/stack'
import ListasAlunos from './ListasAlunos.js'
import AddAlunos from './AddAlunos.js'

const Stack = createStackNavigator()

export default function StackAlunos() {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Alunos' >

            <Stack.Screen name='Alunos' component={ListasAlunos} />
            <Stack.Screen name='AddAlunos' component={AddAlunos} />

            {/* <Stack.Screen name='FormPessoaAsyncStorage' component={FormPessoaAsyncStorage} /> */}

        </Stack.Navigator>

    )
}