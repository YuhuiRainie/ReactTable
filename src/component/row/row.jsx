import React from 'react';

const Row = ({id,type,amount,balance,transaction_date,day_sequence,category}) => {
    // const {id,type,amount,balance,transaction_date,day_sequence,category} = row
    return (
        <React.Fragment>
            <tr>
                <td>{id}</td>
                <td>{type}</td>
                <td>{category}</td>
                <td>{amount}</td>
                <td>{balance}</td>
                <td>{transaction_date}</td>
                <td>{day_sequence}</td>
            </tr>
        </React.Fragment>
    );
};

export default Row;
