import React, {PureComponent,useState} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import MedianPrice from "../../utils/MedianPrice";
import AveragePrice from "../../utils/AveragePrice";
import NumbersWithCommas from "../../utils/NumbersWithCommas";
import ResultsTable from "./ResultsTable";

const NationalChart=(props)=> {
  const [showCarsMileage, setShowCarsMileage] = useState('None');    // All variables entered by user
  const [lowMileage, setLowMileage]=useState(0);
  const [highMileage, setHighMileage]=useState(0);

  console.log(props.cars);

//#####################################################################################//
//  This function will sumarize the cars by state, together with the minimun, maximum  //
//  and median value for each state.  Then, it will sort them using median price       //
//#####################################################################################//
function GetData(cars){

    //*******************************************************************/
    //  First things first, we need to create a multidimensional array  */
    //*******************************************************************/
    let dataSeries = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

    //*************************************************************************************/
    //  Then, we need to define ranges.  We will enter prices in 10K interval up to       */
    //  140K miles.  The last interval will be 150K+ miles.  The results will be in       */
    //  an array. Element 0 will be 0-10K miles, element 1 will be 10K-19,999 miles, etc. */
    //*************************************************************************************/
    let index=0;
    cars.forEach(car=>{

      index=Math.floor(car.miles/10000);    // Getting which of the 15 elements this belongs to
      if(index>15){index=15};               // All mileages above 150K will be aggregated here
      dataSeries[index].push(car.price);

    });

    //*****************************************************/
    //  Creating the response array (array of 15 objects) */
    //*****************************************************/
    let graphData=[];
    let dataPoint={};
    for(let i=0;i<16;i++){
      if(dataSeries[i].length>0){
          graphData.push({
            name: `${i}0-${i+1}0K`,              // Mileage range name
            number: dataSeries[i].length,        // How many cars are in this range
            averagePrice: Math.floor(AveragePrice(dataSeries[i])),
            medianPrice: Math.floor(MedianPrice(dataSeries[i])),
            maxPrice: Math.max.apply(null, dataSeries[i]),
            minPrice: Math.min.apply(null, dataSeries[i])
          });
        } else {
          graphData.push({
            name: `${i}0-${i+1}0K`
          });
        }
    }

    //*************************************************/
    //  Returns the aggregated data, ready to be used  /
    //*************************************************/
    graphData[15].name="150K+";
    console.log(graphData);
    return graphData;

}

//#############################################################################################/
//  Function Handle State:  This will set the state variable to a state where the user wants  //
//  to look at the cars.  Then, this will list all of the cars available for that state.      //
//############################################################################################//
const HandleMileage=(event)=>{
  const { name, value } = event.target;
  setShowCarsMileage(value);

  switch (value){
    case "00-10K":
        setLowMileage(0);
        setHighMileage(9999);
        break;
    case "10-20K":
        setLowMileage(10000);
        setHighMileage(19999);
        break;
    case "20-30K":
        setLowMileage(20000);
        setHighMileage(29999);
        break;
    case "30-40K":
        setLowMileage(30000);
        setHighMileage(39999);
        break;
    case "40-50K":
        setLowMileage(40000);
        setHighMileage(49999);
        break;
    case "50-60K":
        setLowMileage(50000);
        setHighMileage(59999);
        break;
    case "60-70K":
        setLowMileage(60000);
        setHighMileage(69999);
        break;
    case "70-80K":
        setLowMileage(70000);
        setHighMileage(79999);
        break;
    case "80-90K":
        setLowMileage(80000);
        setHighMileage(89999);
        break;
    case "90-100K":
        setLowMileage(90000);
        setHighMileage(99999);
        break;
    case "100-110K":
        setLowMileage(100000);
        setHighMileage(109999);
        break;
    case "110-120K":
        setLowMileage(110000);
        setHighMileage(119999);
        break;
    case "120-130K":
        setLowMileage(120000);
        setHighMileage(129999);
        break;
    case "130-140K":
        setLowMileage(130000);
        setHighMileage(139999);
        break;
    case "140-150K":
        setLowMileage(140000);
        setHighMileage(149999);
        console.log(value);
        break;
    case "150K+":
        setLowMileage(150000);
        setHighMileage(9999999);
        break;
  }

  console.log(value);
  console.log(lowMileage);
  console.log(highMileage);
}

//#############################################################################################/
//  Function Handle State:  This will set the state variable to a state where the user wants  //
//  to look at the cars.  Then, this will list all of the cars available for that state.      //
//############################################################################################//

  class CustomizedLabel extends PureComponent {
    render() {
      const {
        x, y, stroke, value,
      } = this.props;
  
      return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">${value}</text>;
    }
  };
 
  const data=GetData(props.cars);       // Getting all of the data to show the chart

      return (
        <div>
          <LineChart width={1350} height={500} data={GetData(props.cars)}
              margin={{top: 5, right: 30, left: 20, bottom: 5 }}  >

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit='U$'/>
            <Tooltip />
            <Legend />
            <Line connectNulls type="monotone" dataKey="medianPrice" stroke="#0f0994" label={<CustomizedLabel />} activeDot={{ r: 8 }} />
            <Line connectNulls type="monotone" dataKey="maxPrice" stroke="#53078c" label={<CustomizedLabel />} strokeDasharray="3 4 5 2"/>
            <Line connectNulls type="monotone" dataKey="minPrice" stroke="#056117" label={<CustomizedLabel />} strokeDasharray="3 4 5 2"/>
          </LineChart>

          {/* Then, it will ask the user whether it wants to go and look at a specific mileage range and drill down on data */}
          <div className="jumbotron jumbotron-fluid bg-primary my-0 pt-3 pb-1">
              <form className="form-inline">
                   <label className="mx-2 mb-2 text-white">Show me cars in the following mileage range</label>
                   <select className="custom-select mb-2 mr-sm-2" id="range" name="range" onChange={HandleMileage}>
                        <option key="None" value="None">None</option>
                        {data.map(record=>(
                          <option key={record.name} value={record.name}>{record.name}</option>
                        ))}
                    </select>
              </form>
          </div>

          {/* If the user selected a mileage, then it will show the cars for that particular state */}
          {showCarsMileage!=='None'? (
              <div>
                <ResultsTable cars={props.cars.filter(car=> {return car.miles>=lowMileage && car.miles<=highMileage})}/>
              </div>
            ):(
              <div>
              </div>
          )}
        </div>
      );
  }

export default NationalChart;