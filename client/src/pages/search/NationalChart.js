import React, {useState} from "react";
import {ResponsiveContainer,Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart} from 'recharts';
import MedianPrice from "../../utils/MedianPrice";
import AveragePrice from "../../utils/AveragePrice";
import NumbersWithCommas from "../../utils/NumbersWithCommas";
import ResultsTable from "./ResultsTable";
import './NationalChart.style.css';

const NationalChart=(props)=> {
    const [showCarsfromState, setShowCarsfromState] = useState('None');    // All variables entered by user

//#####################################################################################//
//  This function will sumarize the cars by state, together with the minimun, maximum  //
//  and median value for each state.  Then, it will sort them using median price       //
//#####################################################################################//
function GetData(cars,delivered){

    //*******************************************************************/
    //  First, we need to find which states are included in this search  /
    //*******************************************************************/
    let states=[];
    cars.forEach(car=>{
      if(states.indexOf(car.dealer.state)===-1){
        states.push(car.dealer.state);
      }
    });

    if(states.length===0){
      return [];
    }

    //************************************************************************/
    //  Second, for each state, we will get the statistics based on the data  /
    //************************************************************************/
    let car_data=[];      // contains the object to be returned by the overall function
    let state_cars=[];    // Has the subset of cars that belong to the state
    let state_prices=[];  // Array with only prices for each state

    states.forEach(current_state=>{

      state_cars=cars.filter(car=> {       // Getting the subset of card that belong to the state 
        return car.dealer.state===current_state;
      });

      if (delivered){
        state_prices=state_cars.map(a=>a.deliveredprice);
      } else {
        state_prices=state_cars.map(a=>a.price);  //  Getting the prices for the state in an array
      }

      //  Now getting together the information for state
      car_data.push({
        name:           current_state,                           // Name of the state
        carNumber:      state_cars.length,                       // Number of cars
        average_price:  Math.floor(AveragePrice(state_prices)),  // Average_price 
        median_price:   Math.floor(MedianPrice(state_prices)),   // Average_price 
        max_price:      Math.max.apply(null, state_prices),      // Maximum price
        min_price:      Math.min.apply(null, state_prices)       // Minimum price
      });
    });

    //****************************************************************/
    //  Third, we will sort the array from low median to high median  /
    //****************************************************************/
    return car_data.sort((a, b) => (a.median_price > b.median_price) ? 1 : -1)
}

//#############################################################################################/
//  Function Handle State:  This will set the state variable to a state where the user wants  //
//  to look at the cars.  Then, this will list all of the cars available for that state.      //
//############################################################################################//
const HandleState=(event)=>{
  const { value } = event.target;
  setShowCarsfromState(value);
}

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return <text x={x + width / 2} y={y} fill="#666" fontSize={10} textAnchor="middle" dy={-4}>${NumbersWithCommas(value)}</text>;
  };

  const data=GetData(props.cars,props.delivered);       // Getting all of the data to show the chart

      return (
        <div>

          {/* ComposedChart will present a bar/line graph that will show all data from states */}
            <ComposedChart width={1350} height={450} data={data} margin={{top: 5, right: 30, left: 20, bottom: 5 }} >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid stroke="#f5f5f5" />
              <Bar dataKey="median_price" barSize={20} fill="#051282" label={renderCustomBarLabel} style={{fontSize: '0.1rem'}}/>
              <Line type="monotone" dataKey="min_price" stroke="#37ff00" />  
              <Line type="monotone" dataKey="max_price" stroke="#ff001e" />  
            </ComposedChart>

          {/* Then, it will ask the user whether it wants to go and look at a specific state and drill down on data */}
          <div className="jumbotron jumbotron-fluid footer my-0 pt-3 pb-1">
              <form className="form-inline">
                   <label className="mx-2 mb-2">Show me cars in the following State</label>
                   <select className="custom-select mb-2 mr-sm-2" id="range" name="range" onChange={HandleState}>
                        <option key="None" value="None">None</option>
                        {data.map(record=>(
                          <option key={record.name} value={record.name}>{record.name}</option>
                        ))}
                    </select>
              </form>
          </div>

          {/* If the user selected a state, then it will show the cars for that particular state */}
          {showCarsfromState!=='None'? (
            <div>
              <ResultsTable cars={props.cars.filter(car=> {return car.dealer.state===showCarsfromState})}/>
            </div>
          ):(
            <div>
            </div>
          )}
        </div>
      );
  }

export default NationalChart;