import {View, StyleSheet, Button, Text, ToastAndroid} from 'react-native';
import {useState, useEffect} from 'react';
import {TextField} from '../../components/TextField';
import {useCustomersContext} from '../../sections/customers/CustomersContext';
import DropDownPicker from 'react-native-dropdown-picker';
import {z} from 'zod';
import {CustomerFormData} from '../../modules/customers/domain/customer';

interface SelectCity {
  label: string;
  value: string;
}

interface CustomerFormProps {
  onSuccess: () => void;
  isEdit?: boolean;
}

export function CustomerForm({onSuccess, isEdit}: CustomerFormProps) {
  const {registerCustomer, cities, customerEdit, updaterCustomer} =
    useCustomersContext();
  const [customer, setCustomer] = useState<CustomerFormData>(
    customerEdit as any,
  );
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SelectCity[]>([]);
  const [cityId, setCityId] = useState<string | undefined | null>(
    customerEdit?.city_id,
  );
  const [isValidate, setIsValidate] = useState(false);

  const handleChange = (name: string, value: string) => {
    setCustomer({...customer, [name]: value});
  };

  const handleSubmit = () => {
    const schema = z.object({
      dni: z.string().min(8).max(8),
      first_name: z.string().min(1).max(100),
      last_name: z.string().min(1).max(100),
      phone: z.string().min(9).max(9),
      email: z.string().email(),
    });

    const {success} = schema.safeParse(customer);

    if (!success) {
      ToastAndroid.show('Datos no validos', ToastAndroid.SHORT);
      setIsValidate(true);
      return;
    }

    if (!isEdit) {
      registerCustomer({...customer, city_id: cityId ?? ''}).then(() => {
        ToastAndroid.show('Cliente registrado', ToastAndroid.SHORT);
        onSuccess();
      });
    }

    if (isEdit) {
      updaterCustomer(customerEdit?.dni ?? '', customer).then(() => {
        ToastAndroid.show('Cliente actualizado', ToastAndroid.SHORT);
        onSuccess();
        setCustomer({} as CustomerFormData);
      });
    }
  };

  useEffect(() => {
    setItems(cities.map(city => ({label: city.name, value: city.id})));
  }, [cities]);

  return (
    <View style={styles.form}>
      <View style={styles.cityContainer}>
        <Text>Ciudad</Text>
        <DropDownPicker
          listMode="MODAL"
          items={items}
          setItems={setItems}
          open={open}
          setOpen={setOpen}
          value={cityId as string}
          setValue={setCityId}
          placeholder="Selecione una ciudad"
          onChangeValue={value => handleChange('city_id', value)}
        />
      </View>
      <TextField
        name="dni"
        label="DNI"
        editable={!isEdit}
        defaultValue={customerEdit?.dni}
        maxLength={8}
        placeholder="00000000"
        regex={/\d{8,8}/}
        keyboardType="numeric"
        validationMessage="DNI no es valido."
        onChange={handleChange}
        isValidate={isValidate}
      />
      <TextField
        name="first_name"
        label="Nombres"
        defaultValue={customerEdit?.first_name}
        placeholder="ej. Alex Darwin"
        regex={/[a-z A-Z]{1,100}/}
        keyboardType="default"
        validationMessage="Los Nombres son requeridos."
        onChange={handleChange}
        isValidate={isValidate}
      />
      <TextField
        name="last_name"
        label="Apellidos"
        defaultValue={customerEdit?.last_name}
        placeholder="ej. Neyra Jibaja"
        regex={/[a-z A-Z]{1,100}/}
        keyboardType="default"
        validationMessage="Los Apellidos son requeridos."
        onChange={handleChange}
        isValidate={isValidate}
      />
      <TextField
        name="phone"
        label="Telefono"
        defaultValue={customerEdit?.phone}
        placeholder="ej. 985089607"
        regex={/\d{9,9}/}
        maxLength={9}
        keyboardType="phone-pad"
        validationMessage="Telefono no es valido."
        onChange={handleChange}
        isValidate={isValidate}
      />
      <TextField
        name="email"
        label="Correo Electronico"
        defaultValue={customerEdit?.email}
        placeholder="ej. aldanedev@gmail.com"
        regex={/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}
        keyboardType="email-address"
        validationMessage="Correo Electronico no es valido"
        onChange={handleChange}
        isValidate={isValidate}
      />
      <Button title="Grabar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  cityContainer: {
    flexDirection: 'column',
    marginTop: 2,
    marginBottom: 20,
  },
});
