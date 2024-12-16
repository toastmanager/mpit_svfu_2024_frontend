import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createPlacesQueries(filters: PlaceFilters): string {
  return `?types=${filters.types ?? ''}&age_restriction=${
    filters.ageRestriction ?? ''
  }&activities=${filters.activities ?? ''}&min_price=${
    filters.minPrice ?? ''
  }&max_price=${filters.maxPrice ?? ''}&search=${filters.search ?? ''}&start=${
    filters.start ? filters.start.toISOString() : ''
  }&end=${filters.end ? filters.end.toISOString() : ''}`;
}

export const PLACE_TYPES = new Map<string, string>([
  ['LANDMARK', 'Достопримечательность'],
  ['MUSEUM', 'Музей'],
  ['CAFE', 'Кафе'],
  ['RESTAURANT', 'Ресторан'],
  ['BAR', 'Бар'],
  ['MOVIE_THEATER', 'Кинотеатр'],
  ['NATURE', 'Природа'],
]);

export const ACTIVITIES = new Map<string, string>([
  ['SMALL', 'Низкая'],
  ['MEDIUM', 'Средняя'],
  ['ADVANCED', 'Продвинутая'],
  ['HIGH', 'Высокая'],
]);