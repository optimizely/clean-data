import Overview from "./components/Overiew";
import ColumnsView from "./components/ColumnsView";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.scss";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80vw;
  height: 160vh;
  margin: 0 auto;
  padding: 20px 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  hegith: 290vh;
  align-items: flex-start;
  padding: 10px;
`;
const ReportWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  padding: 0 40px;
`;
const Holder = styled.div`
  text-align: center;
  font-family: Helvetica;
  font-size: 3vw;
  padding: 200px 20px;
`;
export const HOST = "https://dataclean-files.s3.amazonaws.com/backend";

function App() {
  const [report, setReport] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [overviewButtonName, setOverviewButtonName] = useState(
    "Show Statistics of Active Customers"
  );
  const [blueTables, setBlueTables] = useState(null);
  const [tableLabel, setTableLabel] = useState("");
  const [tableButtonClick, setTableButtonClick] = useState(false);
  
  const [tableInfo, setTableInfo] = useState(null);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios.get(`${HOST}/get-tables/ufdm_blue.json`, headers).then((res) => {
      let tables = [];
      for (let table in res.data["table_name"]) {
        tables.push(res.data["table_name"][table]);
      }
      setBlueTables(tables);
    });
  }, []);

  const getTableReports = (schema, table) => {
    setTableButtonClick(true);
    axios
      .get(`${HOST}/get-report/${schema}-${table}.json`, headers)
      .then((res) => {
        setTableInfo({...res.data, "label": `${schema}.${table}`})
      });
  };

  const getActiveCustomers = useCallback((event, schema, table) => {
    event.preventDefault();
    if (overviewButtonName === "Show Statistics of Active Customers") {
      axios
        .get(`${HOST}/get-active-customer/account.json`, headers)
        .then((res) => {
          let data = [];
          for (let columnName in res.data.variables) {
            data.push([columnName, res.data.variables[columnName]]);
          }
          setReport(data);
          setOverviewData(res.data.table);
        });
      setOverviewButtonName("Show Statistics of whole table");
    } else {
      axios
        .get(`${HOST}/get-report/${schema}-${table}.json`, headers)
        .then((res) => {
          let data = [];
          for (let columnName in res.data.variables) {
            data.push([columnName, res.data.variables[columnName]]);
          }
          setReport(data);
          setOverviewData(res.data.table);
        });
      setOverviewButtonName("Show Statistics of Active Customers");
    }
  });

  return blueTables ? (
    <Container>
      <Header />
      <Box>
        <Sidebar
          blue={blueTables}
          getTableReports={getTableReports}
          getActiveCustomers={getActiveCustomers}
        />
        <ReportWrapper>
          {!tableInfo && !tableButtonClick ? (
            <Holder>Please select a table for the report</Holder>
          ) : !tableInfo && tableButtonClick ? (
            <Holder>Loading...</Holder>
          ) : tableInfo ? (
            <>
              <Overview
                data={tableInfo.table}
                getActiveCustomers={getActiveCustomers}
                buttonName={overviewButtonName}
                tableLabel={tableInfo.label}
              />
              <ColumnsView
                data={tableInfo.variables}
                buttonName={overviewButtonName}
                tableLabel={tableInfo.label}  
              />
            </>
          ) : null}
        </ReportWrapper>
      </Box>
    </Container>
  ) : (
    <Container>
      <Header />

      <Holder>Loading...</Holder>
    </Container>
  );
}

export default App;
