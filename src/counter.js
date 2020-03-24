import React, { useContext, useState, useEffect, useRef } from "react";
import axios from 'axios';

import { EventsContext, getEventsAction } from './shared/context';
import Cases from './dashboard/Cases';

function swap(arra) {

  if (arra === undefined || arra.length == 0) {
    return arra;
  }
  let a = JSON.parse(JSON.stringify(arra));

  a =  [a[a.length - 1], ...a.slice(0, -1)]

  return a;
}

function compareArr(newA, oldA) {
  const resA = [];
  if (oldA === undefined || oldA.length == 0) {
    return newA;
  }

  newA.forEach((obj, index, ) => {
    const oldObj = oldA.find(element => obj.country == element.country);
    if (oldObj && oldObj.new != obj.new) {
      newA[index].new  = `${obj.new}(${oldObj.new})`; 
      console.log('!!!-', obj.country, newA[index].new);
      resA.push({ ...obj, newOld: oldObj.new });
    }
  });

  newA = swap(newA);
  return newA;
}

function MainTable(data) {
  //country','total', 'new','newDeaths','totalRecovered','active','serious','totCasesPer1m'
  return (
    <table>
      {data.map(e => (
        <tr>
          <td>{e.country}</td>
          <td>{e.total}</td>
          <td>{e.new}</td>
          <td>{e.newDeaths}</td>
          <td>{e.totalRecovered}</td>
          <td>{e.active}</td>
          <td>{e.serious}</td>
          <td>{e.totCasesPer1m}</td>
        </tr>
      ))}
    </table>
  );
}

function Counter() {
  const { state, dispatch } = useContext(EventsContext);
  const [data, setData] = useState([]);
  const [disData, setDisData] = useState([]);
  const [delay, setDelay] = useState(1);

  useInterval(() => {
    getEventsAction(dispatch);
    // axios('http://localhost:3000/').then(r => {
    //   //console.log(r);
    //   let newData = JSON.parse(JSON.stringify(r.data));
    //   newData = compareArr(newData, data);

    //   setDisData(newData);
    //   //console.log('r.data', r.data);
    //  // console.log('data', data);
    //  // console.log('resA', resA);
    //   setData(r.data);

    // })
    //   .catch(e => console.log(e));
    setDelay(30);
  }, delay * 1000);

  return (<Cases data={swap(state.events)}></Cases>);
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

export default Counter;