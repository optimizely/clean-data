import { ListGroup, Button } from "optimizely-oui";

const Sidebar = (props) => {
  return (
    <>
      <div className="flex flex--column width--1-2">
        <ListGroup
          title="UFDM - Blue Layer"
          subtitle="Agregation tables from where you can create Report tables in Green Layer"
          className="width--1-1 color--brand"
        >
          {props.blue.map((table) => {
            return (
              <ListGroup.Item key={table} density="tight">
                <Button
                  key={table}
                  style="plain"
                  width="default"
                  onClick={() =>
                    props.handleTableButtonClick("ufdm_blue", table)
                  }
                >
                  {table}
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </div>
    </>
  );
};

export default Sidebar;
