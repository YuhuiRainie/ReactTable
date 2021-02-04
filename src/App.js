import logo from './logo.svg';
import './App.css';
import Row from "./component/row/row";
import DATA from "./data";
import Table from "./component/table/table";
import React, {useEffect, useState} from 'react';

function App() {
  const transferData = DATA => {return DATA.map(item=>({...item,transaction_date : new Date(item.transaction_date).toLocaleDateString("en-AU")}))}
  const orginalTransferedData = transferData(DATA)
  const [displayedData,setDisplayedData] = useState(orginalTransferedData)
  // useEffect(() =>{console.log("hi")},[displayedData])


  const nonRepeatedArr = (data,uniqueCategory) => {
   return [...new Set(
       data.map(item => item[uniqueCategory] === undefined ? "Uncategorized":
           (item[uniqueCategory]==="" ? "Uncategorized":item[uniqueCategory])
       )
   )]
  }
  const filterForSpecificType = (e,unit) => {
    const filterKeyWord = e.target.value
    const filteredData = orginalTransferedData.filter(item => item[unit] == filterKeyWord)
     return setDisplayedData([...filteredData])
  }

  const sortArr = (data,order,rannkIndx,isDate) => {
   let sorttedData = []
    if(order === 'des'){
        if(isDate){
          sorttedData = data.sort((a, b) => new Date(a.transaction_date) - new Date(b.transaction_date))
        } else{
          sorttedData = data.sort((a,b) => a[rannkIndx]-b[rannkIndx]);
        }
    } else if (order ==='inc'){
      if(isDate) {
        sorttedData = data.sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
      }else {
        sorttedData = data.sort((a,b) => b[rannkIndx]-a[rannkIndx]);
      }
    }
    return sorttedData
  }

  return (
    <div className="App">
      <div className='filter' style={{height:200}}>
        <div>
          <label className="category">category:</label>
          <select onChange={e => filterForSpecificType(e,'category')}>
            {
              nonRepeatedArr(DATA,"category").map(category => <option value={category} >{category}</option> )
             }
          </select>
        </div>
        <div>
          <label className="type">type:</label>
          <select onChange={e => filterForSpecificType(e,'type')}>
            {
              nonRepeatedArr(DATA,"type").map(type => <option id={type} >{type}</option> )
            }
          </select>
        </div>
        <div><button>Classify by category</button></div>
        <div><button>Classify by type</button></div>
      </div>

      <div className='taable-wrapper'>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>type</th>
              <th>category</th>
              <th>amount
                <button onClick={() =>{
                  setDisplayedData([...sortArr(displayedData,'inc','amount',false)])
                }}>
                  &#129045;
                </button>
                <button onClick={() =>setDisplayedData([...sortArr(displayedData,'des','amount',false)])}>
                  &#129031;
                </button>
              </th>
              <th>balance
                <button onClick={() =>setDisplayedData([...sortArr(displayedData,'inc','balance',false)])}>&#129045;</button>
                <button onClick={() =>setDisplayedData([...sortArr(displayedData,'des','balance',false)])}>&#129031;</button>
              </th>
              <th>Date
                <button onClick={() =>setDisplayedData([...transferData(sortArr(DATA,'inc','transaction_date',true))])}>&#129045;</button>
                <button onClick={() =>setDisplayedData([...transferData(sortArr(DATA,'des','transaction_date',true))])}>&#129031;</button>
              </th>
              <th>day_sequence</th>
            </tr>
          </thead>
          <tbody>
            <Table data={displayedData}/>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
