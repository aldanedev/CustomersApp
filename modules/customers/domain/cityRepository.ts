import {City} from './city';

export interface CityRepository {
  getAll(): Promise<City[]>;
}
