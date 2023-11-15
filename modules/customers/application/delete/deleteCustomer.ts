import {CustomerRepository} from '../../domain/customerRepository';

export function deleteCustomer(customerRepository: CustomerRepository) {
  return async function (dni: string) {
    return customerRepository.delete(dni);
  };
}
