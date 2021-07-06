
// import { useState, useEffect } from "react";

const ColumnDetail = (props) => {
    // const [columnDetailState, setColumnDetailState] = useState(props);

    // useEffect(() => {
    //     setColumnDetailState(props)
    // }, [props]);

    return (
        <div>
          <h3>{props.name}</h3>
          <div>
              <div><span>Missing Rows: </span><span>{props.detail.n_missing}</span></div>
              <div><span>Percentage of Missing Rows: </span><span>{props.detail.p_missing * 100}%</span></div>
          </div>
        </div>
    )

  
};

export default ColumnDetail;