import { createApi } from '@reduxjs/toolkit/query/react';
import directionsJson from './stubs/directions.json';
import filtersJson from './stubs/filters.json';

const baseQuery =
({ baseUrl } = { baseUrl: '' }) =>
  async ({ url }) => {
    const wholeUrl = baseUrl + url;

    if (wholeUrl === '/api/filters') {
      return { data: filtersJson };
    }

    if (wholeUrl === '/api/directions') {
      return { data: directionsJson };
    }

    return { data: {} };
  };

const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    getFilters: build.query({ query: () => ({ url: '/filters' }) }),
    getDirections: build.query({ query: () => ({ url: '/directions' }) }),
  }),
})

export default api;
export const { useGetFiltersQuery, useGetDirectionsQuery } = api;
