import {Text, View, StyleSheet, ToastAndroid, Alert} from 'react-native';
import {Customer} from '../../modules/customers/domain/customer';
import {useCustomersContext} from './CustomersContext';
import {ButtonIcon} from '../../components/ButtonIcon';

interface CustomerItemProps {
  customer: Customer;
  onEditCustomer: (dni: string) => void;
}

export function CustomerItem({customer, onEditCustomer}: CustomerItemProps) {
  const {deleteCustomer} = useCustomersContext();

  const onPressDelete = () => {
    Alert.alert(
      'Eliminar cliente',
      `¿Estás seguro de eliminar a ${customer.first_name} ${customer.last_name}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            await deleteCustomer(customer.dni);
            ToastAndroid.show(
              `Cliente ${customer.first_name} eliminado`,
              ToastAndroid.SHORT,
            );
          },
        },
      ],
    );
  };

  const onPressEdit = () => {
    onEditCustomer(customer.dni);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {customer.last_name} {customer.first_name}
        </Text>
        <Text>{customer.email}</Text>
        <Text>
          {customer.phone} | {customer.city.name}
        </Text>
      </View>
      <ButtonIcon color="#4285F4" icon="edit" onPress={onPressEdit} />
      <ButtonIcon color="#EA4335" icon="delete" onPress={onPressDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    borderColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  buttonDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA4335',
    padding: 5,
    height: 70,
    width: 45,
  },
  buttonEdit: {
    height: 70,
    width: 45,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
