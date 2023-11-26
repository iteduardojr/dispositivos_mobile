import { PaperProvider } from 'react-native-paper';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import RouteDrawer from './Router/RouteDrawer';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer theme={DarkTheme}>
        <RouteDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}

