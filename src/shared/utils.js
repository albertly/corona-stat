import React, { useEffect, useRef } from 'react';

import * as f from './img/flags/3x2';

import { countryCodes } from './CountryCodes';

const _headCells = [
  {
    id: 'no',
    numeric: true,
    disablePadding: false,
    label: '#',
    name: 'No',
    sort: false,
  },
  {
    id: 'country',
    numeric: false,
    disablePadding: true,
    label: 'Country',
    name: 'Country',
    sort: true,
  },
  {
    id: 'total',
    numeric: false,
    disablePadding: false,
    label: 'Cases',
    name: 'Total Cases',
    sort: true,
  },
  {
    id: 'new',
    numeric: false,
    disablePadding: false,
    label: 'New Cases',
    name: 'New Cases',
    sort: true,
  },
  {
    id: 'totalDeaths',
    numeric: false,
    disablePadding: true,
    label: 'Deaths',
    name: 'Total Deaths',
    sort: true,
  },
  {
    id: 'newDeaths',
    numeric: false,
    disablePadding: true,
    label: 'New Deaths',
    name: 'New Deaths',
    sort: true,
  },
  {
    id: 'totalRecovered',
    numeric: false,
    disablePadding: true,
    label: 'Recovered',
    name: 'Total Recovered',
    sort: true,
  },
  {
    id: 'newRecovered',
    numeric: false,
    disablePadding: true,
    label: 'New Recovered',
    name: 'New Recovered',
    sort: true,
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: true,
    label: 'Active',
    name: 'Active',
    sort: true,
  },
  {
    id: 'serious',
    numeric: false,
    disablePadding: true,
    label: 'Serious',
    name: 'Serious',
    sort: true,
  },
  {
    id: 'totCasesPer1m',
    numeric: false,
    disablePadding: true,
    label: 'Cases / 1 m',
    name: 'Total Cases per 1 m.',
    sort: true,
  },
  {
    id: 'dPer1m',
    numeric: false,
    disablePadding: true,
    label: 'Death / 1 m',
    name: 'Total Death per 1 m.',
    sort: true,
  },
  {
    id: 'tPer1m',
    numeric: false,
    disablePadding: true,
    label: 'Tests / 1 m',
    name: 'Total Tests per 1 m.',
    sort: true,
  },
  {
    id: 'pop',
    numeric: false,
    disablePadding: true,
    label: 'Population',
    name: 'Population',
    sort: true,
  },
  {
    id: 'cases1m',
    numeric: false,
    disablePadding: true,
    label: 'Cases / 1m',
    name: 'Active Cases per 1 m.',
    sort: true,
  },
  {
    id: '1CperXppl',
    numeric: false,
    disablePadding: true,
    label: 'Case / X ppl',
    name: '1 case per X ppl',
    sort: true,
  },
  {
    id: '1DperXppl',
    numeric: false,
    disablePadding: true,
    label: 'Death / X ppl',
    name: '1 death per X ppl',
    sort: true,
  },
  {
    id: '1TperXppl',
    numeric: false,
    disablePadding: true,
    label: 'Test / X ppl',
    name: '1 test per X ppl',
    sort: true,
  },
];

(function () {
  if (!Number.prototype.pad) {
    Number.prototype.pad = function (size) {
      var s = String(this);
      while (s.length < (size || 2)) {
        s = '0' + s;
      }
      return s;
    };
  }
  if (!Date.prototype.getUTCMonthName) {
    Date.locale = {
      en: {
        month_names: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        month_names_short: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
      },
    };
    Date.prototype.getUTCMonthName = function (lang = 'en') {
      lang = lang && lang in Date.locale ? lang : 'en';
      return Date.locale[lang].month_names[this.getUTCMonth()];
    };

    Date.prototype.getUTCMonthNameShort = function (lang = 'en') {
      lang = lang && lang in Date.locale ? lang : 'en';
      return Date.locale[lang].month_names_short[this.getUTCMonth()];
    };
  }
})();

export const headCells = _headCells;
export const columns = _headCells
  .slice(2)
  .map(e => ({ id: e.id, name: e.name }));

export const Flag = (name, small = true) => {
  const code = getFlagByCountryName(name);

  let width = '1em',
    height = '2em',
    marginRight = '0.2em',
    marginLeft = '0.0em';

  if (!small) {
    width = '2em';
    height = '3em';
    marginRight = '0em';
    marginLeft = '1em';
  }

  if (code) {
    return (
      <img
        alt={name}
        src={f[code]}
        style={{
          width,
          height,
          marginRight,
          marginLeft,
        }}
      />
    );
  }
  return <></>;
};

export function getAlternativeCountryName(name) {
  const index = countryCodes.findIndex(item => item.Name === name);
  if (index !== -1) {
    return countryCodes[index].Name1 ? countryCodes[index].Name1 : name;
  }
  return '';
}

export function getFlagByCountryName(name) {
  const index = countryCodes.findIndex(item => item.Name === name);
  if (index !== -1) {
    return countryCodes[index].Code;
  }
  return '';
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const InfinityToZero = v =>
  v === 'Infinity' || v === '-Infinity' ? 0 : v;

export const todayFormated = `${new Date().getUTCMonthNameShort()} ${new Date().getUTCDate()}`;

export const toNumber = v => +v.replace(/[^\d.\-eE+]/g, '');

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ((max > 120 ? 120 : max) - min + 1)) + min;
}

export function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

export function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export function union(a, b) {
  return [...a, ...not(b, a)];
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
