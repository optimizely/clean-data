import { ListGroup, Button } from "optimizely-oui";

const Sidebar = (props) => {
  const showTitleValues = {
    dw_fivetran_ufdm_blue: "UFDM Blue Layer",
    ufdm_blue: "UFDM Blue Layer",
  };
  const showDescription = {
    dw_fivetran_ufdm_blue:
      "Agregation tables from where you can create Report tables in Green Layer",
    ufdm_blue:
      "Agregation tables from where you can create Report tables in Green Layer",
  };
  return (
    <>
      <div className="flex flex--column width--1-2">
        {Object.entries(props.tables).map(([schema, tableNames]) => {
          return (
            <ListGroup
              title={
                schema in showTitleValues ? showTitleValues[schema] : schema
              }
              key={schema}
              subtitle={
                schema in showDescription
                  ? showDescription[schema]
                  : "Data from selected columns in salesforce account table to be validated"
              }
              className="width--1-1 color--brand"
            >
              {tableNames.map((tableName) => {
                return (
                  <ListGroup.Item key={tableName} density="tight">
                    <Button
                      key={tableName + `button`}
                      style="plain"
                      width="default"
                      onClick={() =>
                        props.handleTableButtonClick(
                          "ufdm_blue",
                          tableName
                        )
                      }
                    >
                      {tableName}
                    </Button>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;
