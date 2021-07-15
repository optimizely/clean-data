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
  align-items: flex-start;
  width: 70vw;
  height: 160vh;
  margin: 0 auto;
  padding: 20px 0;
`

const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  hegith: 290vh;
  align-items: flex-start;
  padding: 10px;
`
const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 130vh;
  padding: 0 40px;
`

const Title = styled.h2`
    font-family: 'Roboto';
    font-size: '3rem';
`

function App() {

  const [report, setReport] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [overviewButtonName, setOverviewButtonName] = useState('Show Statistics of Active Customers')
  const [blueTables, setBlueTables] = useState(null);
  const [greenTables, setGreenTables] = useState(null);
  const [tableLabel, setTableLabel] = useState('');
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    axios.get('http://localhost:8000/get-tables/ufdm', headers)
      .then((res) => {
        let tables = [];
        for (let table in res.data["table name"]) {
          tables.push(res.data["table name"][table]);
        }
        setGreenTables(tables);
      })
    
    axios.get('http://localhost:8000/get-tables/ufdm_blue', headers)
      .then((res) => {
        let tables = [];
        for (let table in res.data["table name"]) {
          tables.push(res.data["table name"][table]);
        }
        setBlueTables(tables);
      })
  },[]);

  // useEffect(() => {
  //   const headers = {
  //     'Access-Control-Allow-Origin': '*',
  //     'Content-Type': 'application/json',
  //   };
  //   axios.get('http://localhost:8000/get-report', headers)
  //     .then((res) => {
  //       let data = [];
  //       for (let columnName in res.data.variables) {
  //         data.push([columnName, res.data.variables[columnName]]);
  //       }
  //       console.log(res.data)
  //       setReport(data);
  //       setOverviewData(res.data.table)
  //     });
  // },[]);

  const getTableReports = useCallback((schema,table)=> {
      axios.get(`http://localhost:8000/get-report/${schema}-${table}`, headers)
        .then((res) => {
          let data = [];
          for (let columnName in res.data.variables) {
            data.push([columnName, res.data.variables[columnName]]);
          }
          console.log(res.data.table);
          setReport(data);
          setOverviewData(res.data.table);
          setTableLabel(`${schema}.${table}`)
      })

  });

  const getActiveCustomers = useCallback( event => {
    event.preventDefault();
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

  let reportSection;
  if (!report && !overviewData) {
    reportSection = <h1>Please select a table for the report</h1>
  } else if (report && overviewData) {
    reportSection = (
      <ReportWrapper>
        <Overview 
            data={overviewData} 
            getActiveCustomers={getActiveCustomers} 
            buttonName={overviewButtonName} 
            tableLabel={tableLabel}
        />
        <Title>Column Validation</Title>
        <ColumnsView data={report} />
      </ReportWrapper>
    )
  }

  if (blueTables && greenTables) {
    return (
      <Container>
        <Header />
          <Box>
            <Sidebar green={greenTables} blue={blueTables} getTableReports={getTableReports} />
            {reportSection}
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
