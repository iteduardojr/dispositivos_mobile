import { PaperProvider } from 'react-native-paper';
import Router from './src/Router';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer theme={DarkTheme}>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  );
}

