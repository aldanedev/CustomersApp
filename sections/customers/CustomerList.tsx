import {View, ScrollView, Text} from 'react-native';
import {CustomerItem} from './CustomerItem';
import {useCustomersContext} from './CustomersContext';

interface CustomerListProps {
  onEditCustomerItem: (dni: string) => void;
}

export function CustomerList({onEditCustomerItem}: CustomerListProps) {
  const {customers} = useCustomersContext();

  if (!customers) {
    return (
      <View>
        <Text>No hay clientes registrados</Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        {customers.map(customer => (
          <CustomerItem
            key={customer.dni}
            customer={customer}
            onEditCustomer={onEditCustomerItem}
          />
        ))}
      </ScrollView>
    </View>
  );
}
