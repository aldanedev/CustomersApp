import {CustomerRepository} from '../../domain/customerRepository';

export function updaterCustomer(customerRepository: CustomerRepository) {
  return async function (dni: string, customer: any) {
    return customerRepository.updater(dni, customer);
  };
}
