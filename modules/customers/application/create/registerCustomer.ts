import {CustomerFormData} from '../../domain/customer';
import {CustomerRepository} from '../../domain/customerRepository';

export function registerCustomer(customerRepository: CustomerRepository) {
  return async function (customer: CustomerFormData) {
    return customerRepository.register(customer);
  };
}
