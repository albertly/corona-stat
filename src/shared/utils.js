import { useEffect, useRef } from "react";

(function() {
    if (!Number.prototype.pad) {
        console.log('in iffi .')
        Number.prototype.pad = function (size) {
            var s = String(this);
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
        }
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
