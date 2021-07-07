// import { useState, useEffect } from "react";
import ColumnDetail from './ColumnDetail';


function ColumnsView(props) {
    // const [columnViewState, setColumnViewState] = useState(props);

    // useEffect(() => {
    //     setColumnViewState(props)
    // },[props]);

    // let keys = Object.keys(columnViewState.data);

    return (
        <div>
            <h2>Column Validation</h2>
            <ul>
                {props.data.map((column) => (
                    <ColumnDetail key={column[0]} name={column[0]} detail={column[1]} />
                ))}
            </ul>
        </div>
    )
}

export default ColumnsView;