import { useState, useRef } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { Button } from "optimizely-oui";
import { HOST } from "../App";

const SolutionButton = (props) => {
  const [csvData, setCSVData] = useState("");
  const csvLink = useRef();
  const tableLabel = props.tableLabel;
  const isActiveCustomersON = props.isActiveCustomersON;

  let solution = <div></div>;
  if (props.p_missing > 0 && tableLabel === "ufdm_blue.customer_detail") {
    solution = (
      <div>
        <Button
          size="small"
          width="default"
          onClick={() => getCSVFile(isActiveCustomersON)}
        >
          {" "}
          Solution{" "}
        </Button>
        <CSVLink
          filename={`${props.name}_missing_report.csv`}
          data={csvData}
          ref={csvLink}
          asyncOnClick={true}
          target="_blank"
        />
      </div>
    );
  } else if (
    props.p_missing === 0 &&
    tableLabel === "ufdm_blue.customer_detail"
  ) {
    solution = <div className="color--good-news">It is clean!</div>;
  }

  const getCSVFile = async (buttonName) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    let endPoint = ``;
    console.log(isActiveCustomersON)
    if (!isActiveCustomersON) {
      endPoint = `${HOST}/get-missing-report/${props.name}-0.csv`;
    } else {
      endPoint = `${HOST}/get-missing-report/${props.name}-1.csv`;
    }

    axios
      .get(endPoint, headers)
      .then((res) => {
        setCSVData(res.data);
        csvLink.current.link.click();
      })
      .catch((err) => console.error(err));
  };

  return <>{solution}</>;
};

export default SolutionButton;
