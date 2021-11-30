import React from "react";
import { Table } from "optimizely-oui";
import PropTypes from "prop-types";

class SortedTable extends React.Component {
  state = {
    tableContents: this.props.tableContents,
    currentOrder: this.props.currentOrder,
    currentSortedColumn: this.props.currentSortedColumn,
  };

  handleSorting = (columnName) => {
    // If the user isn't switching sort columns, toggle the sort direction
    const sortToggleMap = {
      ["asc"]: "desc",
      ["desc"]: "asc",
    };
    let newOrder = "asc";
    if (this.state.currentSortedColumn === columnName) {
      newOrder = sortToggleMap[this.state.currentOrder];
    }
    this.setState({
      currentOrder: newOrder,
      currentSortedColumn: columnName,
    });
    if (newOrder === "asc") {
      this.state.tableContents.sort((a, b) =>
        a[columnName] > b[columnName] ? 1 : -1
      );
    } else {
      this.state.tableContents.sort((b, a) =>
        a[columnName] > b[columnName] ? 1 : -1
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevProps.tableContents.every(
        (value, index) => value === this.props.tableContents[index]
      )
    ) {
      this.setState({ tableContents: this.props.tableContents });
    }
  }

  render() {
    const { currentOrder, tableContents } = this.state;
    return (
      <Table>
        <Table.THead>
          <Table.TR>
            <Table.TH
              sorting={{
                canSort: true,
                handleSort: () => this.handleSorting("Column Name"),
                order: currentOrder,
              }}
            >
              Column Name
            </Table.TH>
            <Table.TH>Metric Type</Table.TH>
            <Table.TH
              sorting={{
                canSort: true,
                handleSort: () => this.handleSorting("Missing Rows"),
                order: currentOrder,
              }}
            >
              Missing Rows
            </Table.TH>
            <Table.TH
              sorting={{
                canSort: true,
                handleSort: () => this.handleSorting("Missing Percentage"),
                order: currentOrder,
              }}
            >
              Missing Percentage
            </Table.TH>
          </Table.TR>
        </Table.THead>
        <Table.TBody>
          {tableContents.map((row, idx) => {
            return (
              <Table.TR key={idx}>
                <Table.TD>{row["Column Name"]}</Table.TD>
                <Table.TD> {row["Metric Type"]} </Table.TD>
                <Table.TD className={row["className"]} width="20%">
                  {row["Missing Rows"].toLocaleString()}{" "}
                </Table.TD>
                <Table.TD className={row["className"]}>
                  {" "}
                  {(row["Missing Percentage"] * 100).toFixed(1) + "%"}{" "}
                </Table.TD>
              </Table.TR>
            );
          })}
        </Table.TBody>
      </Table>
    );
  }
}

SortedTable.propTypes = {
  currentOrder: PropTypes.string,
  currentSortedColumn: PropTypes.string,
  tableContents: PropTypes.arrayOf(
    PropTypes.shape({
      "Column Name": PropTypes.string,
      "Metric Type": PropTypes.string,
      "Missing Rows": PropTypes.number,
      "Missing Percentage": PropTypes.number,
      className: PropTypes.string,
    })
  ),
};

function ColumnsView(props) {
  const currentOrder = "asc";
  const currentSortedColumn = "Missing Rows";
  const tableLabel = props.tableLabel;

  const tableContents = Object.keys(props.data)
    .reduce((acc, value) => {
      acc.push([value, props.data[value]]);
      return acc;
    }, [])
    .map((column) => {
      let columnName = column[0];
      let columnDetails = column[1];

      return {
        "Column Name": columnName,
        "Metric Type": columnDetails.metric_name,
        "Missing Rows": columnDetails.value,
        "Missing Percentage": columnDetails.percentage,
        className:
          columnDetails.percentage > 0.2
            ? "color--bad-news"
            : "color--good-news",
      };
    });
  // See top of file for implementation of a sortable table
  return (
    <div>
      <SortedTable
        tableContents={tableContents}
        currentOrder={currentOrder}
        currentSortedColumn={currentSortedColumn}
      />
    </div>
  );
}

export default ColumnsView;