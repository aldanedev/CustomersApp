import {City} from '../domain/city';
import {CityRepository} from '../domain/cityRepository';
import {API_BASE_URL} from './Constans';

export function createApiCityRepository(): CityRepository {
  return {
    getAll,
  };
}

async function getAll(): Promise<City[]> {
  const url = `${API_BASE_URL}/cities`;
  const response = await fetch(url);
  const customers = await response.json();
  return customers;
}
