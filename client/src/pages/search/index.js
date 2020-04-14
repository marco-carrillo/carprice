//###############################################################################/
//  The following function will ask for a car VIN and then will simply           */
//  fetch all cars with the same characteristics that are selling around the US  */
//###############################################################################/
import React,{useState} from "react";
import './index.style.css'
import axios from 'axios';
import ResultsStats from './ResultsStats';
import ResultsTable from './ResultsTable';
import NationalChart from './NationalChart';
import NumbersWithCommas from '../../utils/NumbersWithCommas';

const Selling = () =>{
    const [formObject, setFormObject] = useState({});             // All variables entered by user
    const [newSearch, setnewSearch] = useState(true);             // Whether a new search was started
    const [localDataReady, setLocalDataReady] = useState(false);  // Whether data is ready or not
    const [allCars,setAllCars] =useState();                       // contains comparable cars retrieved by API
    const [allAvgPrice,setAllAvgPrice] =useState(0);              //  National average price
    const [allMedPrice,setAllMedPrice] =useState(0);              //  National median price
    const [allNbrCars,setAllNbrCars]=useState(0);                 //  Local number of cars
    const [cars,setCars] =useState();                             // contains comparable cars retrieved by API
    const [avgPrice,setAvgPrice] =useState(0);                    //  National average price
    const [medPrice,setMedPrice] =useState(0);                    //  National median price
    const [nbrCars,setNbrCars]=useState(0);                       //  Local number of cars
    const [localCars,setLocalCars]=useState();                    //  Info with local car information
    const [localAvgPrice,setLocalAvgPrice] =useState(0);          //  Local average price
    const [localMedPrice,setLocalMedPrice] =useState(0);          //  Local median price
    const [localNbrCars,setLocalNbrCars]=useState(0);             //  Local number of cars
    const [mileageRange,setMileageRange]=useState(0);             //  Range for mileage search

  //############################################################################/
  // Handles updating component state when the user types into the input field */
  // For now, only the search name is being stored here.                       */
  //############################################################################/
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  //###################################################/
  //  Following function calculates the average price */
  //###################################################/
  const average_price= list => {
    let sum = 0;
    for( let i = 0; i < list.length; i++ ){
        sum += parseInt( list[i], 10 ); //don't forget to add the base
    }
    
    return sum/list.length;
  }

  //###################################################/
  //  Following function calculates the median price */
  //###################################################/
  const median_price = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  //###################################################/
  // Calculating average and median price for cars */
  //###################################################/
  async function calculate_stats(car_info){

    let raw_prices=car_info.map(a=>a.price);  // Extracting only the prices

    //********************************************************/
    //  Will eliminate any 0 preces or undefined prices
    //********************************************************/
    let clean_prices=[];
    raw_prices.forEach(price=>{
        if(price&&price>0){clean_prices.push(price)}
    });
    
  }

  //##############################################################/
  //  Following function defines the range of equivalent mileage */
  //##############################################################/

  const getRange = (miles) =>{
    if(miles<5000){
      return (miles-1);
    } else if(miles>=5000 && miles<10000){
      return 2000;
    } else if (miles>=10000 && miles<20000){
      return 3000;
    } else if (miles >=20000 && miles<35000){
      return 3500;
    } else if (miles >=35000 && miles <50000){
      return 4000;
    } else if (miles >=50000 && miles<75000){
      return 6000;
    } else if (miles >=75000 && miles<100000){
      return 10000;
    } else if (miles >=10000 && miles<125000){
      return 20000;
    } else if (miles >=125000 && miles< 175000){
      return 25000;
    } else if (miles >=175000){
      return 50000;
    }
  }

  //##################################################################################/
  // When the form is submitted, use fetch to call the server API which in turn will */
  // call Google API and retrieve sets of books.  If there are results, then update  */
  // the component's state with the list of books retrieved.                         */                               */
  //##################################################################################/
  async function handleFormSubmit1(event) {
    event.preventDefault();
    setnewSearch(false);
    alert(`got clicked with ${formObject.VIN}`)

      //******************************************/
      //  Setting the API query to call the API  */
      //******************************************/
      let zipcode=formObject.ZIP;
      let API_key=console.log(process.env.REACT_APP_MKTCHECK_APIKEY);
      let start=0;

      let APIQuery=`https://marketcheck-prod.apigee.net/v2/search/car/active`+
                    `?api_key=${API_key}&radius=1000&zip=${zipcode}`+
                    `&vins=${formObject.VIN}` +
                    `&rows=50&start=${start}&facet_sort=count&country=US`;
    
      //***************************************/
      //  Calling the API  for the first time */
      //**************************************/
      let res=await axios.get(APIQuery);
      let data=res.data.listings;

      //********************************************************************************/
      //  API allows pagination of 50 results, will paginate until getting all of the  */
      //  listings available in the US                                                 */ 
      //********************************************************************************/
      let total_records=Math.min(4950,parseInt(res.data.num_found)-50);
      if(total_records<0){total_records=0};

      let total_iterations=Math.floor(total_records/50)+1;

      for(let i=1;i<=total_iterations;i++){
            start=i*50;  // Pagination starts at
            let APIQuery=`https://marketcheck-prod.apigee.net/v2/search/car/active`+
                            `?api_key=${API_key}&radius=4000&zip=${zipcode}`+
                            `&vins=${formObject.VIN}` +
                            `&rows=50&start=${start}&facet_sort=count&country=US`;

            let res=await axios.get(APIQuery);  // Calling the same API but starting at a higher row
            let subset=res.data.listings;
            console.log('Data is ',subset);
            data.push(...subset);                  // Adding the subset to the overall data
        }

        console.log(data);  // complete data set
        localStorage.setItem("data",JSON.stringify(data));
  };

  //###############################################/
  //  Second part of the API (manipulating data)  */
  //###############################################/
  async function handleFormSubmit(event) {
    event.preventDefault();
        let data=JSON.parse(localStorage.getItem("data"));
        console.log(data);

        //***********************************************************************/
        //  After getting the results from the API, will do some data cleaning  */
        //  any results that don't have a price will be eliminated              */
        //***********************************************************************/
        let data_clean=data.filter(function(car){return car.price>0 && car.miles>0  });
        setCars(data_clean);

        //*******************************************************************************/
        //  The first step is to obtain the "local price", which is the median price    */
        //  of the car within the mileage indicated by the user within 150 miles        */
        //*******************************************************************************/
        setMileageRange(getRange(formObject.mileage));
        let lower_miles=parseInt(formObject.mileage)-parseInt(getRange(formObject.mileage));
        let higher_miles=parseInt(formObject.mileage)+parseInt(getRange(formObject.mileage));

        let data_local=data_clean.filter(function(car){
            return car.miles>=lower_miles && car.miles<= higher_miles && car.dist<150
        })

        let local_prices=data_local.map(a=>a.price);  // Extracting only the prices
        setLocalCars(data_local);
        setLocalAvgPrice(Math.floor(average_price(local_prices)));
        setLocalMedPrice(Math.floor(median_price(local_prices)));
        setLocalNbrCars(local_prices.length);
        setLocalDataReady(true);

        //*******************************************************************************/
        //  The second step is to obtain a "national price", which is the median price  */
        //  of the car broken down by state, minimun, maximum. median prices            */
        //*******************************************************************************/

        let data_national=data_clean.filter(function(car){
          return car.miles>=lower_miles && car.miles<= higher_miles
        })
      
        let national_prices=data_national.map(a=>a.price);  // Extracting only the prices
        setCars(data_national);
        setAvgPrice(Math.floor(average_price(national_prices)));
        setMedPrice(Math.floor(median_price(national_prices)));
        setNbrCars(national_prices.length);

        //*******************************************************************************/
        //  The third step is to obtain a "national price" for all similar cars         */ 
        //  regardless of the number of miles, or distance.  This is different from the */
        //  "national price" since it considers mileage while here we do not            */
        //*******************************************************************************/
        national_prices=data_clean.map(a=>a.price);  // Extracting only the prices
        setAllCars(data_clean);
        setAllAvgPrice(Math.floor(average_price(national_prices)));
        setAllMedPrice(Math.floor(median_price(national_prices)));
        setAllNbrCars(national_prices.length);

      }

  function handleNewSearch(event){
      event.preventDefault();
  }

    return(
        <div>
            {/********************************************************/}
            {/* Fist row will contain a jumbotron with the VIN search*/}
            {/********************************************************/}
            <div className="jumbotron jumbotron-fluid bg-info my-0 pt-3 pb-1">
                <form className="form-inline">
                    <label className="mx-2 mb-2 text-white">VIN</label>
                    <input type="text" className="form-control mb-2 mx-5 px-5"
                                        onChange={handleInputChange}
                                        id="VIN"
                                        name="VIN"
                                        placeholder="Enter VIN number"/>

                    <label className="mx-2 mb-2 text-white">Mileage</label>
                    <input type="text" className="form-control mb-2 mr-sm-4"
                                        onChange={handleInputChange}
                                        id="mileage"
                                        name="mileage"
                                        placeholder="Car Mileage"/>

                    <label className="mx-2 mb-2 text-white">Zip Code</label>
                    <input type="text" className="form-control mb-2 mr-sm-4"
                                        onChange={handleInputChange}
                                        id="ZIP"
                                        name="ZIP"
                                        placeholder="ZIP Code"/>
`
                    <button className="btn btn-white bg-primary mb-2 mx-5" type="submit" 
                            disabled={!formObject.VIN||!formObject.mileage||!formObject.ZIP} onClick={handleFormSubmit}>
                            Search Cars
                    </button>
                </form>
            </div>
            {/*****************************************************************/}
            {/* second row will contain information about the local ca search */}
            {/*****************************************************************/}
            <div className="row">
                <div className="col-md-12">
                    {localDataReady ? (
                        <div>
                          <ResultsStats title={`Local cars for sale by Dealer (cars with ${NumbersWithCommas(formObject.mileage-mileageRange)} and ${NumbersWithCommas(formObject.mileage-(-mileageRange))} miles located within 150 miles from ZIP code ${formObject.ZIP})`}
                                            distance="within 150 miles"
                                             range={mileageRange} 
                                             nbr={localNbrCars} 
                                             avg={localAvgPrice} 
                                             med={localMedPrice}/>
                          <ResultsTable cars={localCars}/>
                          <ResultsStats title={`Cars for sale by Dealer nationwide with mileage between ${NumbersWithCommas(formObject.mileage-mileageRange)} and ${NumbersWithCommas(formObject.mileage-(-mileageRange))}`}
                                            distance="nationwide"
                                             range={mileageRange} 
                                             nbr={nbrCars} 
                                             avg={avgPrice} 
                                             med={medPrice}/>
                          <NationalChart cars={cars}/>
                          <ResultsStats title={`Cars for sale by Dealer nationwide all mileage`}
                                             nbr={allNbrCars} 
                                             avg={allAvgPrice} 
                                             med={allMedPrice}/>
                          <NationalChart cars={allCars}/>
                        </div>
                              ) : (
                            <h3></h3>
                     )}
                </div>
            </div>

        </div>
    )
};

export default Selling;