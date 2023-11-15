import {View} from 'react-native';
import {CustomerForm} from '../sections/customers/CustomerForm';

export function AddCustomerScreen({navigation}: any) {
  return (
    <View>
      <CustomerForm
        onSuccess={() => navigation.navigate('Clientes')}
        isEdit={false}
      />
    </View>
  );
}
