import { useEffect, useRef } from "react";

(function () {
  if (!Number.prototype.pad) {
    console.log('in iffi .')
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

  Date.prototype.getUTCMonthNameShort = function (lang= 'en') {
    lang = lang && (lang in Date.locale) ? lang : 'en';
    return Date.locale[lang].month_names_short[this.getUTCMonth()];
  };
}


})();

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
