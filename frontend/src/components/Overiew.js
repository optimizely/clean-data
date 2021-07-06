import { CSVLink } from "react-csv";

const Overview = (props) => {

    return (
        <div>
            <h1>Overview</h1>
            <h3>Data Statistics</h3>
            <button>Show Statistics of Active Customers</button>
            <h4>Number of columns</h4>
            <span>{props.data.n_var}</span>
            <h4>Total Row Count</h4>
            <span>{props.data.n}</span>
            <h4>Number of Customers with complete data</h4>
            <h4>Number of Customers with missing data</h4>
            <h4>Percentage of Customers with missing data</h4>
        </div>
    )
}


export default Overview;