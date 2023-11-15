import {Customer} from '../../domain/customer';
import {CustomerRepository} from '../../domain/customerRepository';

export function getAllCustomers(customerRepository: CustomerRepository) {
  return async function (): Promise<Customer[]> {
    return customerRepository.getAll();
  };
}
