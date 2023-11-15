import React, {useState, useEffect, useContext} from 'react';
import {deleteCustomer} from '../../modules/customers/application/delete/deleteCustomer';
import {getAllCustomers} from '../../modules/customers/application/get-all/getAllCustomers';
import {registerCustomer} from '../../modules/customers/application/create/registerCustomer';
import {
  Customer,
  CustomerFormData,
  CustomerUpdateFormData,
} from '../../modules/customers/domain/customer';
import {CustomerRepository} from '../../modules/customers/domain/customerRepository';
import {City} from '../../modules/customers/domain/city';
import {getAllCities} from '../../modules/customers/application/get-all/getAllCities';
import {CityRepository} from '../../modules/customers/domain/cityRepository';
import {getCustomer} from '../../modules/customers/application/get/getCustomer';
import {updaterCustomer} from '../../modules/customers/application/update/updater';

export interface ContextState {
  customers: Customer[];
  cities: City[];
  deleteCustomer: (dni: string) => Promise<void>;
  registerCustomer: (customer: CustomerFormData) => Promise<void>;
  getCustomer: (dni: string) => Promise<void>;
  customerEdit: CustomerFormData | null;
  updaterCustomer: (
    dni: string,
    customer: CustomerUpdateFormData,
  ) => Promise<void>;
  setCustomerEdit: (customer: CustomerFormData | null) => void;
}

export const CustomersContext = React.createContext({} as ContextState);

export const CustomersContextProvider = ({
  children,
  customerRepository,
  cityRepository,
}: React.PropsWithChildren<{
  customerRepository: CustomerRepository;
  cityRepository: CityRepository;
}>) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerEdit, setCustomerEdit] = useState<CustomerFormData | null>(
    null,
  );
  const [cities, setCities] = useState<City[]>([]);

  async function fetchCustomers() {
    const customers = await getAllCustomers(customerRepository)();
    setCustomers(customers);
  }

  async function fetchCities() {
    const cities = await getAllCities(cityRepository)();
    setCities(cities);
  }

  async function deleter(dni: string) {
    await deleteCustomer(customerRepository)(dni);
    await fetchCustomers();
  }

  async function register(customer: CustomerFormData) {
    await registerCustomer(customerRepository)(customer);
    await fetchCustomers();
  }

  async function get(dni: string) {
    const customer = await getCustomer(customerRepository)(dni);
    setCustomerEdit(customer);
  }

  async function updater(dni: string, customer: CustomerUpdateFormData) {
    await updaterCustomer(customerRepository)(dni, customer);
    await fetchCustomers();
  }

  useEffect(() => {
    fetchCustomers();
    fetchCities();
  }, []);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        registerCustomer: register,
        deleteCustomer: deleter,
        cities,
        getCustomer: get,
        customerEdit,
        updaterCustomer: updater,
        setCustomerEdit,
      }}>
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomersContext = () => useContext(CustomersContext);
