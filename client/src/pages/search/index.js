//###############################################################################/
//  The following function will ask for a car VIN and then will simply           */
//  fetch all cars with the same characteristics that are selling around the US  */
//###############################################################################/
import React,{useState} from "react";
import "./index.style.css"
import axios from "axios";
import ResultsStats from "./ResultsStats";
import ResultsTable from "./ResultsTable";
import NationalChart from "./NationalChart";
import NumbersWithCommas from "../../utils/NumbersWithCommas";
import AveragePrice from "../../utils/AveragePrice";
import MedianPrice from "../../utils/MedianPrice"; 
import NationalCurve from "./NationalCurve";

const Selling = () =>{
    const [formObject, setFormObject] = useState({});             // All variables entered by user
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

    if(name!=="delivered"){
      setFormObject({...formObject, [name]: value})
    } else{
      setFormObject({...formObject,[name]: event.target.checked})
    }
  };

  //################################################################/
  //  Following function determines 1 of 16 ranges based on mileage*/
  //################################################################/
  const getMileageClass= (mileage) =>{
        let index=Math.floor(mileage/10000);    // Getting which of the 15 elements this belongs to
        if(index>15){index=15};                   // All mileages above 150K will be aggregated here

        return index;
  }

  //########################################################################/
  //  Following function determines how much is the expected delivery cost */
  //########################################################################/
  const getDeliveredCost= (distance) =>{

    let incidentals=0;
    let shipping=0;
    let inspection=0;

    if(distance<=150){
      incidentals=0;                // No incidentals
      inspection=0;                 // No inspection costs
      shipping=0;                   // No shipping required
    } else if (distance>1500) {
      incidentals =50;              // Fixed
      inspection = 133;             // RepairPal estimate of inspection cost
      shipping=1468;                // Long-distance freight
    } else {
      incidentals =distance*50/1500;   // Phone calls, other
      inspection = 133;
      if(distance <250){
        shipping =300;
      } else if(distance<500){
        shipping =600;
      } else if(distance<750){
        shipping =800;
      } else if(distance<1000){
        shipping =1000;
      } else if(distance<1250){
        shipping =1200;
      } else {
        shipping =1300;
      } 
    }

    return Math.floor(incidentals+shipping+inspection);
}
//##################################################################/
  //  Following function determines 1 of 10 ranges based on distance */
  //##################################################################/
  const getDistanceClass= (distance) =>{

    if(distance<150){
      return 0;
    } else if(distance>=150 && distance<250){
      return 1;
    } else if (distance>=250 && distance<500){
      return 2;
    } else if (distance >=500 && distance<750){
      return 3;
    } else if (distance >=750 && distance <1000){
      return 4;
    } else if (distance >=1000 && distance<1250){
      return 5;
    } else if (distance >=1250 && distance<1500){
      return 6;
    } else if (distance >=1500){
      return 7;
    }
      return 0;
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

        //***********************************************************************/
        //  After getting the results from the API, will do some data cleaning  */
        //  any results that don't have a price or any car with no mileage will */
        //  be eliminated.  It will add two data categories to help classify    */
        //  the car later on:  mileage class, and distance class.               */
        //***********************************************************************/
        let data_clean=data.filter(function(car){return car.price>0 && car.miles>0  });
        for(let i=0;i<data_clean.length;i++){
            data_clean[i].distanceclass=getDistanceClass(data_clean[i].dist);
            data_clean[i].milesclass=getMileageClass(data_clean[i].miles);
            data_clean[i].deliveredprice=data_clean[i].price+getDeliveredCost(data_clean[i].dist);
        }
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
        setLocalAvgPrice(Math.floor(AveragePrice(local_prices)));
        setLocalMedPrice(Math.floor(MedianPrice(local_prices)));
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
        setAvgPrice(Math.floor(AveragePrice(national_prices)));
        setMedPrice(Math.floor(MedianPrice(national_prices)));
        setNbrCars(national_prices.length);

        //*******************************************************************************/
        //  The third step is to obtain a "national price" for all similar cars         */ 
        //  regardless of the number of miles, or distance.  This is different from the */
        //  "national price" since it considers mileage while here we do not            */
        //*******************************************************************************/
        national_prices=data_clean.map(a=>a.price);  // Extracting only the prices
        setAllCars(data_clean);
        setAllAvgPrice(Math.floor(AveragePrice(national_prices)));
        setAllMedPrice(Math.floor(MedianPrice(national_prices)));
        setAllNbrCars(national_prices.length);

      }

    return(
        <div>
            {/********************************************************/}
            {/* Fist row will contain a jumbotron with the VIN search*/}
            {/********************************************************/}
            <div className="jumbotron jumbotron-fluid heading my-0 pt-3 pb-1">
                <form className="form-inline">
                    <label className="ml-5 mr-3 mb-2 text-white">VIN</label>
                    <input type="text" className="form-control mb-2 mx-4 px-5"
                                        onChange={handleInputChange}
                                        id="VIN"
                                        name="VIN"
                                        placeholder="Enter VIN number"/>

                    <label className="mx-3 mb-2 text-white">Mileage</label>
                    <input type="text" className="form-control mb-2 mr-sm-4"
                                        onChange={handleInputChange}
                                        id="mileage"
                                        name="mileage"
                                        placeholder="Car Mileage"/>

                    <label className="mx-3 mb-2 text-white">Zip Code</label>
                    <input type="text" className="form-control mb-2 mr-sm-4"
                                        onChange={handleInputChange}
                                        id="ZIP"
                                        name="ZIP"
                                        placeholder="ZIP Code"/>

                    <input type="checkbox" className="form-check-input mb-2" 
                                        onChange={handleInputChange}
                                        id="delivered"
                                        value="option1"
                                        name="delivered"/>
                    <label className="mx-3 mb-2 text-white">Use delivered price</label>

                    <button className="btn pushButton mb-2 ml-3" type="submit" 
                            // disabled={!formObject.VIN||!formObject.mileage||!formObject.ZIP}
                             onClick={handleFormSubmit}>
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
                                             nbr={localNbrCars} 
                                             avg={localAvgPrice} 
                                             med={localMedPrice}/>
                          <ResultsTable cars={localCars}/>
                          <ResultsStats title={`Cars for sale by Dealer nationwide with mileage between ${NumbersWithCommas(formObject.mileage-mileageRange)} and ${NumbersWithCommas(formObject.mileage-(-mileageRange))}`}
                                             nbr={nbrCars}
                                             avg={avgPrice} 
                                             med={medPrice}/>
                          <NationalChart cars={cars} 
                                         delivered={formObject.delivered}/>
                          <ResultsStats title={`Cars for sale by Dealer nationwide all mileage`}
                                             nbr={allNbrCars} 
                                             avg={allAvgPrice} 
                                             med={allMedPrice}/>
                          <NationalChart cars={allCars}
                                         delivered={formObject.delivered}/>
                          <ResultsStats title={`Median price of Nationwide cars by mileage range`}
                                             nbr={allNbrCars} 
                                             avg={allAvgPrice} 
                                             med={allMedPrice}/>
                          <NationalCurve cars={allCars}
                                         delivered={formObject.delivered}/>
                        </div>
                              ) : (
                            <div/>
                     )}
                </div>
            </div>
        </div>
    )
};

export default Selling;