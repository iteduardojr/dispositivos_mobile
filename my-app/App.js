import { StyleSheet, Text, View } from 'react-native';
import MeuComponente from './components/MeuComponente';
import MinMax from './components/MinMax';
import MeuComponente2 from './components/semana02/MeuComponente2';
import NumeroAleatorio from './components/NumeroAleatorio';

export default function App(props) {
  return (
    <View style={styles.container}>
      <MeuComponente/>
      <MinMax min={10} max={22}/>
      <MeuComponente2/>
      <NumeroAleatorio min={1} max={100} />
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
