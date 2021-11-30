import Overview from "./components/Overiew";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TableTabNav from "./components/TableTabNav";
import styled from "styled-components";
import { useState, useEffect } from "react";
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
export const HOST = "https://dataclean-files.s3.amazonaws.com/dev-backend";

function App() {
  const [data, setData] = useState({ schema: null, table: null });

  const [tables, setTables] = useState(null);

  const [tableButtonClick, setTableButtonClick] = useState(false);
  const [tableInfo, setTableInfo] = useState(null);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  useEffect(() => {
    axios.get(`${HOST}/get-tables/tables.json`, headers).then((res) => {
      setTables(res.data);
    });
  }, []);

  useEffect(() => {
    const { table, schema } = data;
    if (!table || !schema) return;
    getTableReports();
  }, [data]);

  const getTableReports = () => {
    const { table, schema } = data;
    setTableButtonClick(true);
    const imgUrl = `${HOST}/get-table-img/${table}/null-heatmap.jpg`;
    axios
      .get(`${HOST}/get-report/${schema}-${table}.json`, headers)
      .then((res) => {
        setTableInfo({
          ...res.data,
          label: `${schema}.${table}`,
          imgUrl: imgUrl,
        });
      });
  };

  return tables ? (
    <Container>
      <Header />
      <Box>
        <Sidebar
          tables={tables}
          handleTableButtonClick={(schema, table) => {
            setData({ schema, table });
          }}
        />
        <ReportWrapper>
          {!tableInfo && !tableButtonClick ? (
            <Holder>Please select a table for the report</Holder>
          ) : !tableInfo && tableButtonClick ? (
            <Holder>Loading...</Holder>
          ) : tableInfo ? (
            <>
              <Overview data={tableInfo.table} tableLabel={tableInfo.label} />
              <TableTabNav key={tableInfo.label} tableInfo={tableInfo} />
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
