import Overview from "./components/Overiew";
import ColumnsView from "./components/ColumnsView";
import AlertForm from "./components/AlertForm";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    axios.get('data/data.json')
      .then((res) => {
        let data = [];
        for (let columnName in res.data) {
          data.push([columnName, res.data[columnName]]);
        }
        setReport(data);
      });
  },[]);

  if (report) {
    return (
      <div>
        <h1>Data Validation</h1>
        <Overview data={report} />
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
