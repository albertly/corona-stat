import React, { useEffect, useRef } from "react";

import * as f from './img/flags/3x2'

import { countryCodes } from './CountryCodes';

(function () {
  if (!Number.prototype.pad) {
    Number.prototype.pad = function (size) {
      var s = String(this);
      while (s.length < (size || 2)) { s = "0" + s; }
      return s;
    }
  }
  if (!Date.prototype.getUTCMonthName) {
    Date.locale = {
      en: {
        month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    };
    Date.prototype.getUTCMonthName = function (lang = 'en') {
      lang = lang && (lang in Date.locale) ? lang : 'en';
      return Date.locale[lang].month_names[this.getUTCMonth()];
    };

    Date.prototype.getUTCMonthNameShort = function (lang = 'en') {
      lang = lang && (lang in Date.locale) ? lang : 'en';
      return Date.locale[lang].month_names_short[this.getUTCMonth()];
    };
  }


})();

export const Flag = (name, small = true) => {
  const code = getFlagByCountryName(name);

  let width = "1em",
    height = "2em",
    marginRight = "0.2em",
    marginLeft = "0.0em";

  if (!small) {
    width = "2em";
    height = "3em";
    marginRight = "0em";
    marginLeft = "1em";
  }

  if (code) {
    
    return (
      
      <img alt={name} src={f[code]} style={{
        width,
        height,
        marginRight,
        marginLeft
      }} />
    )
  }
  return <></>;
}

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
    return countryCodes[index].Code
  }
  return '';
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const InfinityToZero = v => v === "Infinity" ? 0 : v;

export const todayFormated = `${new Date().getUTCMonthNameShort()} ${new Date().getUTCDate()}`;

export const toNumber = v => +(v.replace(/[^\d.\-eE+]/g, ""));

export function getRandomInt(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * ((max > 120 ? 120 : max) - min + 1)) + min;
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
