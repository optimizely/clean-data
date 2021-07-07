import Overview from "./components/Overiew";
import ColumnsView from "./components/ColumnsView";
import AlertForm from "./components/AlertForm";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [report, setReport] = useState(null);
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    axios.get('http://localhost:8000/get-report', headers)
      .then((res) => {
        console.log(res)
        let data = [];
        console.log(res.data.variables);
        for (let columnName in res.data.variables) {
          data.push([columnName, res.data.variables[columnName]]);
        }
        setReport(data);
        setOverviewData(res.data.table)
      });
  },[]);

  console.log(report)

  if (report && overviewData) {
    return (
      <div>
        <h1>Data Validation</h1>
        <Overview data={overviewData} />
        <ColumnsView data={report} />
        <AlertForm />
      </div>
    );
  } else {
    return (
      <div>Loading</div>
    )
  }


}

export default App;
