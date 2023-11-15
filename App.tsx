import {NavigationContainer} from '@react-navigation/native';
import {createApiCityRepository} from './modules/customers/infrastructure/ApiCityRepository';
import {createApiCustomerRepository} from './modules/customers/infrastructure/ApiCustomerRepository';
import {MyStack} from './Navigation';
import {CustomersContextProvider} from './sections/customers/CustomersContext';

export default function App() {
  const customerRepository = createApiCustomerRepository();
  const cityRepository = createApiCityRepository();
  return (
    <CustomersContextProvider
      customerRepository={customerRepository}
      cityRepository={cityRepository}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </CustomersContextProvider>
  );
}
