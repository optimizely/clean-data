import Overview from "./components/Overiew";
import ColumnsView from "./components/ColumnsView";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState, useEffect, useCallback} from "react";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  height: 100%;
  margin: 0 auto;
`
const Title = styled.h1`
  font-family: 'Roboto';
  font-size: '4rem';
`
const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
  padding: 10px;
`
const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  height: 100%;
  width: 100%;
  padding: 0 50px;
`

function App() {

  const [report, setReport] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [overviewButtonName, setOverviewButtonName] = useState('Show Statistics of Active Customers')
  const [schema, setSchema] = useState(null);

  // useEffect(() => {
  //   const headers = {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json',
  //   };
  //   axios.get('http://localhost:8000/get-schemas', headers)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  // },[])
  useEffect(() => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    };
    axios.get('data/report.json', headers)
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
        <Header />
          <Box>
            <Sidebar />
            <ReportWrapper>
              <Overview data={overviewData} getActiveCustomers={getActiveCustomers} buttonName={overviewButtonName} />
              <ColumnsView data={report} />
            </ReportWrapper>
          </Box>
      </Container>
    );
  } else {
    return (
      <Container>Loading</Container>
    )
  }


}

export default App;
