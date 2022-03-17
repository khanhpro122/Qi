import Apaexchart from './Apaexchart/Apaexchart';
import './App.css';
import Data from './Treegraph/Data';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UploadFile from './UploadFile/UploadFile';
import Structure from './Treegraph/TreeGraph';
let DateGenerator = require('random-date-generator');

function App() {
  const [data,setData] = useState([])
  DateGenerator.getRandomDate(); // random date
  let arrayDays = []
  let startDate = new Date(2022, 2, 15);
  let endDate = new Date(2022, 3, 15);
  for(var i = 0; i < 20; i++) {
    arrayDays.push(`${DateGenerator.getRandomDateInRange(startDate, endDate).getDay()}/${DateGenerator.getRandomDateInRange(startDate, endDate).getMonth()}`)
  }
  const days = [...new Set(arrayDays)]
  console.log(days)
  const getData = async () => {
    await axios.get('https://api-dev.hrms.com.vn/api/v1/employee', {
      headers:{"Authorization" : 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYjk4YjAxZjc5OWUyNDI3MTEzNjUxNiIsInVzZXJfbmFtZSI6ImdpYW5nYnZAcWkuY29tLnZuIiwiZW1wbG95ZWUiOiI2MjE1ZmY2MTM5YjA5OGRlYzFlMTIxOGMiLCJjdXN0b21lciI6IjYxYjk4NWE3YTZmZWYyYTRjMmU4ZDZiNSIsImlhdCI6MTY0NzM5NjQzOCwiZXhwIjoxNjQ3NDAzNjM4fQ.kf77Tt3nRZg5Vh7uiUwOFCNP9aaLeUIOzn49jxmf-CcD7A9kTcbsHCLmn1H0uk-t-fdct3XMNZF8jBrpKXs-fjwvACRJnpfWv-A3m9HCpVIp0BO12gIzQchyH3zz7Gvhx1BNELKlzKz-RqbQPF-hmUuzk9S33Gs9Bpydaphvuw2xXtWjLfPSR7U4GsF99G1YZ4KlRrdkiBBNuY1tylQX-Hr2yK52Xo-3d_ryCAsTZKy8T6Wb5bofnuy85y-rk9udZX11nmGizidFwZRcFu8wK8NZwHYA1fGToTqx9Lm8ss4n687Q6l6y3Oa3Co8Fvx6EpEqeuXGCyjlm8v6UZAoQMQ'}
    })
    .then(function (response) {
        setData(response.data.message?.map((arr) => {
          return {
            id: arr.id,
            days
          }
        }));
    })
    .catch(function (error) {
    console.log(error);
    });
  }
  useEffect(() => {
    getData()
  },[])
  return (
    <div>
        <Structure />
        <Data />
        {/* <Apaexchart days={days} data={data}/> */}
        {/* <UploadFile /> */}
    </div>
  );
}

export default App;
