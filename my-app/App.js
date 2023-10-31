import { PaperProvider } from 'react-native-paper';
import DrawerRoutes from './src/routes/DrawerRoutes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (

    <PaperProvider>
      <NavigationContainer>

        {/* <Router /> */}
        <DrawerRoutes />
      </NavigationContainer>
    </PaperProvider>

  );
}