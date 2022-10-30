import classes from './converter.module.scss';
import { useGetFiltersQuery, useGetDirectionsQuery } from './service';
import Exchange from './exchange';
import { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from '../consts';

const Converter = () => {
  // type Direction = { code: string, name: string }
  // type Filter = { from: Direction, to: Array<Direction> }
  const { data: filters, isLoading: filtersIsLoading } = useGetFiltersQuery(); // Array<Filter>
  const { data: directions, isLoading: directionsIsLoading } = useGetDirectionsQuery(); // Array<Direction>

  const [filterFrom, setFilterFrom] = useState('all'); // all, cash, cryptocurrency, bank
  const [filterTo, setFilterTo] = useState('all'); // all, cash, cryptocurrency, bank

  const [directionFrom, setDirectionFrom] = useState(''); // string, this is index of array
  const [directionTo, setDirectionTo] = useState(''); // string, this is index of array

  const currentDirectionsFrom = useMemo(() => {
    if (filterFrom === 'all') {
      return directions;
    }

    return directions.filter((item) => CATEGORIES[filterFrom].includes(item.code));
  }, [directions, filterFrom]);

  const currentDirectionsTo = useMemo(() => {
    const directionsTo = filters?.find((item) => item.from.code === directions[directionFrom]?.code)?.to || [];

    if (filterTo === 'all') {
      return directionsTo;
    }

    return directionsTo.filter((item) => CATEGORIES[filterTo].includes(item.code));
  }, [filters, filterTo, directionFrom]);

  useEffect(() => {
    setFilterTo('all');
    setDirectionTo('');
  }, [filterFrom, directionFrom]);

  useEffect(() => {
    setDirectionFrom('');
  }, [filterFrom]);

  useEffect(() => {
    setDirectionTo('');
  }, [filterTo]);

  if (filtersIsLoading || directionsIsLoading) {
    return 'Loading...';
  }

  return (
    <div className={classes.wrapper}>
      <Exchange
        title={'Отдаете'}
        directions={currentDirectionsFrom}
        typeFilter={filterFrom}
        direction={directionFrom}
        setTypeFilter={setFilterFrom}
        setDirection={setDirectionFrom}
      />
      <div style={{ height: 30 }} />
      <Exchange
        title={'Получаете'}
        directions={currentDirectionsTo}
        typeFilter={filterTo}
        direction={directionTo}
        setTypeFilter={setFilterTo}
        setDirection={setDirectionTo}
      />
    </div>
  );
}

export default Converter;