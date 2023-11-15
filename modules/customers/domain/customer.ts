import {City} from './city';

export interface Customer {
  dni: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  city: City;
}

export interface CustomerFormData extends Omit<Customer, 'city'> {
  city_id: string;
}

export interface CustomerUpdateFormData extends Omit<Customer, 'city' | 'dni'> {
  city_id: string;
}
