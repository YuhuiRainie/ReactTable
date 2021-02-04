import './table.css'
import React,{useEffect} from 'react';

import Row from "../row/row";

const Table = ({data}) => {
    const len = data.length
    let sum = 0
    const aggergate = type => {
        return data.map(item => item[type])
                    .reduce((accumulator, currentValue) => accumulator + currentValue)
    }
    return (
        <React.Fragment>
            {
                data.map(
                    row => {return <Row key={row.id} {...row}/>}
                )
            }
            <tr>
                <td>Sum</td>
                <td></td>
                <td></td>
                <td>{aggergate('amount')}</td>
                <td>{aggergate('balance')}</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>Ave</td>
                <td></td>
                <td></td>
                <td>{aggergate('amount')/len}</td>
                <td>{aggergate('balance')/len}</td>
                <td></td>
                <td></td>
            </tr>
        </React.Fragment>
    );
};

export default Table;
