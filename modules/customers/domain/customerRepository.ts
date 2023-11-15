import {Customer, CustomerFormData} from './customer';

export interface CustomerRepository {
  getAll(): Promise<Customer[]>;
  get(dni: string): Promise<Customer>;
  delete(dni: string): Promise<void>;
  register(customer: CustomerFormData): Promise<void>;
  updater(dni: string, customer: CustomerFormData): Promise<void>;
}
