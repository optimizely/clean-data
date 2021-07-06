
// import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
const ColumnDetail = (props) => {
    // const [columnDetailState, setColumnDetailState] = useState(props);

    // useEffect(() => {
    //     setColumnDetailState(props)
    // }, [props]);

    return (
        <div>
          <h3>{props.name}</h3>
          <input type="button" value="Export to CSV File" />
        {/* <CSVLink
          headers={headers}
          filename="report.csv"
          data={data}
          ref={this.csvLinkEl}
        /> */}
          <div>
              <div>
                  <span>Missing Rows: </span>
                  <span>{props.detail.n_missing}</span>
              </div>
              <div>
                  <span>Percentage of Missing Rows: </span>
                  <span>{(props.detail.p_missing * 100).toFixed(2)}%</span>
              </div>
          </div>
        </div>
    )

  
};

export default ColumnDetail;