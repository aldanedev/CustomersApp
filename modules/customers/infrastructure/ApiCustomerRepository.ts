import {
  Customer,
  CustomerFormData,
  CustomerUpdateFormData,
} from '../domain/customer';
import {CustomerRepository} from '../domain/customerRepository';
import {API_BASE_URL} from './Constans';

export function createApiCustomerRepository(): CustomerRepository {
  return {
    getAll,
    delete: deleteCustomer,
    register,
    get,
    updater,
  };
}

async function getAll(): Promise<Customer[]> {
  const url = `${API_BASE_URL}/customers`;
  const response = await fetch(url);
  const customers = await response.json();
  return customers;
}

async function deleteCustomer(dni: string): Promise<void> {
  const url = `${API_BASE_URL}/customers/${dni}`;
  await fetch(url, {
    method: 'DELETE',
  });
}

async function register(customer: CustomerFormData): Promise<void> {
  const url = `${API_BASE_URL}/customers`;
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(customer),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function get(dni: string): Promise<Customer> {
  const url = `${API_BASE_URL}/customers/${dni}`;
  const response = await fetch(url);
  const customer = await response.json();
  return customer;
}

async function updater(
  dni: string,
  customer: CustomerUpdateFormData,
): Promise<void> {
  const url = `${API_BASE_URL}/customers/${dni}`;
  await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(customer),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
