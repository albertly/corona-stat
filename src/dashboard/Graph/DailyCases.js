import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DailyCases() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/graph');
      console.log('result',result);
      setData(result.data);
    };
    fetchData();
  }, []);
  return data ? (
    <ul>
      {data.xAxis.categories.map(item => (
        <li key={item}>
          {item}
        </li>
      ))}
    </ul>
  ) : (
      <>
      </>
  );
}
