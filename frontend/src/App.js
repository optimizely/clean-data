import Overview from "./components/Overiew";
import ColumnsView from "./components/ColumnsView";
// import AlertForm from "./components/AlertForm";
import styled from "styled-components";
import { useState, useEffect, useCallback} from "react";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
`
const Title = styled.h1`
  font-family: 'Roboto';
  font-size: '4rem';
`

function App() {
  const [report, setReport] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [overviewButtonName, setOverviewButtonName] = useState('Show Statistics of Active Customers')

  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    axios.get('http://localhost:8000/get-report', headers)
      .then((res) => {
        let data = [];
        for (let columnName in res.data.variables) {
          data.push([columnName, res.data.variables[columnName]]);
        }
        setReport(data);
        setOverviewData(res.data.table)
      });
  },[]);

  const getActiveCustomers = useCallback( event => {
    event.preventDefault();
    console.log('getActiveCustomers')
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    if (overviewButtonName === 'Show Statistics of Active Customers') {
        axios.get('http://localhost:8000/get-active-customers', headers)
        .then((res) => {
          let data = [];
          for (let columnName in res.data.variables) {
            data.push([columnName, res.data.variables[columnName]]);
          }
          setReport(data);
          setOverviewData(res.data.table)
        });
        setOverviewButtonName('Show Statistics of whole table')
    } else {
        axios.get('http://localhost:8000/get-report', headers)
        .then((res) => {
          let data = [];
          for (let columnName in res.data.variables) {
            data.push([columnName, res.data.variables[columnName]]);
          }
          setReport(data);
          setOverviewData(res.data.table)
        });
        setOverviewButtonName('Show Statistics of Active Customers')
    }


  });

  if (report && overviewData) {
    return (
      <Container>
        <Title>Clean Data</Title>
        <Overview data={overviewData} getActiveCustomers={getActiveCustomers} buttonName={overviewButtonName} />
        <ColumnsView data={report} />
        {/* <AlertForm /> */}
      </Container>
    );
  } else {
    return (
      <Container>Loading</Container>
    )
  }


}

export default App;
