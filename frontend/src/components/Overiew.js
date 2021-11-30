import { SummaryBar, Switch } from "optimizely-oui";

const Overview = (props) => {
  const tableLabel = props.tableLabel.split(".");
  const table = tableLabel[1];

  let basicColumns;

  if (table.includes("customer_detail")) {
    basicColumns = [
      {
        header: "Number of Columns",
        bodyContent: {
          value: props.data.n_var,
          color: "black",
          isNumber: true,
        },
      },
      {
        header: "Total Row Count",
        bodyContent: {
          value: props.data.n.toLocaleString(),
          color: "black",
          isNumber: true,
        },
      },
      {
        header: "Number of Customers with complete data",
        bodyContent: {
          value: props.data.without_nulls.toLocaleString(),
          color:
            (props.data.perc_nulls * 100).toFixed(1) < 50.0 ? "green" : "red",
          isNumber: true,
        },
      },
      {
        header: "Number of Customers with missing data",
        bodyContent: {
          value: props.data.with_nulls.toLocaleString(),
          color:
            (props.data.perc_nulls * 100).toFixed(1) < 50.0 ? "green" : "red",
          isNumber: true,
        },
      },
      {
        header: "Percentage of Customers with missing data",
        bodyContent: {
          value: (props.data.perc_nulls * 100).toFixed(1) + "%",
          color:
            (props.data.perc_nulls * 100).toFixed(1) < 50.0 ? "green" : "red",
          isNumber: true,
        },
        headerHelpTooltip:
          "This columns were excluded for the calculation: " +
          props.data.columns_excluded.join(", "),
      },
    ];
  } else {
    basicColumns = [
      {
        header: "Number of Columns",
        bodyContent: {
          value: props.data.n_var,
          color: "black",
          isNumber: true,
        },
      },
      {
        header: "Total Row Count",
        bodyContent: {
          value: props.data.n,
          color: "black",
          isNumber: true,
        },
      },
    ];
  }

  return (
    <div>
      <SummaryBar
        columns={basicColumns}
        extraInfo={"last update " + props.data.date_calculation}
        title={table + " Summary"}
        className="push--bottom"
        testSection={"summary-bar-test"}
      ></SummaryBar>
    </div>
  );
};

export default Overview;
