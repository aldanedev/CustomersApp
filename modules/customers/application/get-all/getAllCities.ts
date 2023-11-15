import {CityRepository} from '../../domain/cityRepository';

export function getAllCities(cityRepository: CityRepository) {
  return async function () {
    return cityRepository.getAll();
  };
}
