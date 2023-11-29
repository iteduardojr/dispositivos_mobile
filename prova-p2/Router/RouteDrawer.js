import { createDrawerNavigator } from "@react-navigation/drawer";
import Router from "./Router";
import Produtos from "../src/screen/Produtos";
import Eventos from "../src/screen/Eventos";
import Dormitorio from "../src/screen/Dormitorio";

const Drawer = createDrawerNavigator();

export default function RouteDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Router} options={{headerShown: false}}/>
            <Drawer.Screen name="Produto" component={Produtos} />
            <Drawer.Screen name="Eventos" component={Eventos} />
            <Drawer.Screen name="Dormitório" component={Dormitorio} />
        </Drawer.Navigator>
    )
}
