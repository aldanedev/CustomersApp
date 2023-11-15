import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {useCustomersContext} from '../sections/customers/CustomersContext';
import {CustomerForm} from '../sections/customers/CustomerForm';

export function EditCustomerScreen({
  navigation,
  route: {
    params: {dni},
  },
}: any) {
  const {getCustomer} = useCustomersContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCustomer(dni).then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View>
      <CustomerForm
        onSuccess={() => {
          navigation.navigate('Clientes');
        }}
        isEdit
      />
    </View>
  );
}
