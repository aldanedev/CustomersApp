import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddCustomerScreen} from './screens/AddCustomerScreen';
import {CustomerScreen} from './screens/CustomerScreen';
import {EditCustomerScreen} from './screens/EditCustomerScreen';

const Stack = createNativeStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Clientes" component={CustomerScreen} />
      <Stack.Screen name="Nuevo cliente" component={AddCustomerScreen} />
      <Stack.Screen name="Editar cliente" component={EditCustomerScreen} />
    </Stack.Navigator>
  );
}
