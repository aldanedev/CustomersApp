import {CustomerFormData} from '../../domain/customer';
import {CustomerRepository} from '../../domain/customerRepository';

export function getCustomer(customerRepository: CustomerRepository) {
  return async function (dni: string) {
    const customer = await customerRepository.get(dni);
    const customerData: CustomerFormData = {
      dni: customer.dni,
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone,
      city_id: customer.city.id,
    };

    return customerData;
  };
}
