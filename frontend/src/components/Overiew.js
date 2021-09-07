import { SummaryBar, Switch } from "optimizely-oui";


const Overview = (props) => {
    const tableLabel = props.tableLabel.split('.');
    const schema = tableLabel[0];
    const table = tableLabel[1];

    let basicColumns;
    let ac_button;
    
    if (table === 'customer_detail'){
        basicColumns = [
            {
            header: 'Number of Columns',
            bodyContent: {
                value: props.data.n_var,
                color: 'black',
                isNumber: true,
            },
            },
            {
            header: 'Total Row Count',
            bodyContent: {
                value: props.data.n,
                color: 'black',
                isNumber: true,
            },
            },
            {
            header: 'Number of Customers with complete data',
            bodyContent: {
                value: props.data.without_nulls,
                color: ((props.data.perc_nulls * 100).toFixed(1) < 50.0 ? 'green' : 'red'),
                isNumber: true,
            },
            },
            {
            header: 'Number of Customers with missing data',
            bodyContent: {
                value: props.data.with_nulls,
                color: ((props.data.perc_nulls * 100).toFixed(1) < 50.0 ? 'green' : 'red'),
                isNumber: true,
            },
            },
            {
            header: 'Percentage of Customers with missing data',
            bodyContent: {
                    value: (props.data.perc_nulls * 100).toFixed(1)+'%',
                    color: ((props.data.perc_nulls * 100).toFixed(1) < 50.0 ? 'green' : 'red'),
                    isNumber: true,
                },
            headerHelpTooltip: "This columns were excluded for the calculation: " + props.data.columns_excluded.join(", "),
            },
        ];
        ac_button = <div className="push flex flex-justified--center delta">
            <div className="delta push--right">
                {props.buttonName}
            </div>
            <Switch
                onChange={(event) => props.getActiveCustomers(event, schema, table)}
                checked={(props.buttonName === "Show Statistics of Active Customers" ? false : true)}
                ariaLabel={props.buttonName}
                elementId={props.buttonName}
            >
            </Switch>
        </div>
    }
    else{
        basicColumns = [
            {
            header: 'Number of Columns',
            bodyContent: {
                value: props.data.n_var,
                color: 'black',
                isNumber: true,
            },
            },
            {
            header: 'Total Row Count',
            bodyContent: {
                value: props.data.n,
                color: 'black',
                isNumber: true,
            },
            },
        ];
        ac_button = <div className="push"></div>;
    }

    return (
    <div>
        <SummaryBar 
            columns={basicColumns}
            extraInfo="last update 2021/09/01"
            title={table + ' Summary'}
            className="push--bottom"
            testSection={ 'summary-bar-test' }
        >
        </SummaryBar>
        {ac_button}
    </div>
    )
}

export default Overview;