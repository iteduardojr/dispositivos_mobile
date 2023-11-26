import { createDrawerNavigator } from "@react-navigation/drawer";
import Router from "./Router";
import Produtos from "../src/screen/Produtos";

const Drawer = createDrawerNavigator();

export default function RouteDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Feed" component={Router} options={{headerShown: false}}/>
            <Drawer.Screen name="Produto" component={Produtos} />
        </Drawer.Navigator>
    )
}
