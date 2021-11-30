import { TabNav } from "optimizely-oui";
import { useState } from "react";
import ColumnsView from "./ColumnsView";
import StewarshipTable from "./StewarshipTable"

async function exists(url) {
  const result = await fetch(url, { method: "GET" });
  return result.ok;
}

const TableTabNav = (props) => {
  const [tabSelected, setTabSelected] = useState("ColumnView");
  const [imageCharged, setImageCharged] = useState(false);

  const tableInfo = props.tableInfo;

  exists(tableInfo.imgUrl)
    .then((res) => {
      setImageCharged(res);
    })
    .catch((e) => {
      setImageCharged(e);
    });

  let NavShow = <></>;


  if (tabSelected === "ColumnView") {
    NavShow = (
      (tableInfo.label.includes("stewardship")) ? 
        <StewarshipTable 
        data={tableInfo.variables}
        isActiveCustomersON={props.isActiveCustomersON}
        tableLabel={tableInfo.label}
        /> :
        <ColumnsView
          data={tableInfo.variables}
          isActiveCustomersON={props.isActiveCustomersON}
          tableLabel={tableInfo.label}
        />
    );
  } else {
    NavShow = <img src={tableInfo.imgUrl} alt=""></img>;
  }

  return (
    <>
      <TabNav activeTab={tabSelected} style={["sub", "dashboard"]}>
        <TabNav.Tab
          onClick={() => {
            setTabSelected("ColumnView");
          }}
          tabId="ColumnView"
        >
          Details Table
        </TabNav.Tab>
        {imageCharged ? (
          <TabNav.Tab
            onClick={() => {
              setTabSelected("NullDist");
            }}
            tabId="NullDist"
          >
            Null Distribution Plot
          </TabNav.Tab>
        ) : null}
      </TabNav>
      {NavShow}
    </>
  );
};

export default TableTabNav;
