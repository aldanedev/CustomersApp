import {View, Button} from 'react-native';
import {CustomerList} from '../sections/customers/CustomerList';
import {useCustomersContext} from '../sections/customers/CustomersContext';

export function CustomerScreen({navigation}: any) {
  const {setCustomerEdit} = useCustomersContext();

  const handleAddCustomer = () => {
    setCustomerEdit(null);
    navigation.navigate('Nuevo cliente');
  };

  const handleEditCustomerItem = (dni: string) => {
    navigation.navigate('Editar cliente', {dni});
  };

  return (
    <View>
      <Button title="Nuevo cliente" onPress={handleAddCustomer} />
      <CustomerList onEditCustomerItem={handleEditCustomerItem} />
    </View>
  );
}
