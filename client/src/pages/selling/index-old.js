//********************************************************************************/
//  The following function will ask for a car VIN and then will simply           */
//  fetch all cars with the same characteristics that are selling around the US  */
//********************************************************************************/
import React,{useState} from "react";
import './index.style.css'
import axios from 'axios';

const Selling = () =>{
    const [formObject, setFormObject] = useState({})
    const [newSearch, setnewSearch] = useState(true);
    const [dataRetrieved, setDataRetrieved] = useState(false);
    const [cars,setCars] =useState();
    const [avgPrice,setAvgPrice] =useState(0);
    const [medPrice,setMedPrice] =useState(0);

  //****************************************************************************/
  // Handles updating component state when the user types into the input field */
  // For now, only the search name is being stored here.                       */
  //****************************************************************************/
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  //**********************************************************************************/
  // When the form is submitted, use fetch to call the server API which in turn will */
  // call Google API and retrieve sets of books.  If there are results, then update  */
  // the component's state with the list of books retrieved.                         */                               */
  //**********************************************************************************/
  async function handleFormSubmit1(event) {
    event.preventDefault();
    setnewSearch(false);
    alert(`got clicked with ${formObject.VIN}`)

      //******************************************/
      //  Setting the API query to call the API  */
      //******************************************/
      let zipcode='23120';
      let API_key=console.log(process.env.REACT_APP_MKTCHECK_APIKEY);
      let start=0;
      API_key=`OLz1uwITcoEWceLvHRW3jPQQS19O9E19`;

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


  //****************************************************/
  //  Following function calculates the average price */
  //****************************************************/
  function average_price(list){
    let sum = 0;
    for( let i = 0; i < list.length; i++ ){
        sum += parseInt( list[i], 10 ); //don't forget to add the base
    }
    
    return sum/list.length;
  }

  //**************************************************/
  //  Following function calculates the median price */
  //**************************************************/
  const median_price = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  //************************************************/
  // Calculating average and median price for cars */
  //************************************************/ 
  async function calculate_stats(car_info){

    console.log(car_info);
    let raw_prices=car_info.map(a=>a.price);  // Extracting only the prices

    //********************************************************/
    //  Will eliminate any 0 preces or undefined prices
    //********************************************************/
    let clean_prices=[];
    raw_prices.forEach(price=>{
        if(price&&price>0){clean_prices.push(price)}
    });
    
    console.log(clean_prices);
    console.log('Median ',median_price(clean_prices));
    console.log('Average ',average_price(clean_prices));
    console.log('Min ',Math.min.apply(Math,clean_prices));
    console.log('Max ',Math.max.apply(Math,clean_prices));

  }

  //***********************************************/
  //  Second part of the API (manipulating data)  */
  //***********************************************/
  async function handleFormSubmit(event) {
        let data=JSON.parse(localStorage.getItem("data"));
        console.log(data);
        setCars(data);
        calculate_stats(data);
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
                <div className="row text-center text-white align-center">
                    <div className="col-md-2 pt-2">
                        <h5>VIN</h5>
                    </div> 
                    <div className="col-md-6">
                            <div className="input-group mb-3">
                                <input className="form-control"
                                        onChange={handleInputChange}
                                        name="VIN"
                                        placeholder="WP0CB2A85JS228282"/>
                                <div className="input-group-append">
                                    <button className="btn btn-white bg-primary" type="button" 
                                            disabled={!formObject.VIN} onClick={handleFormSubmit}>
                                            Search Cars
                                    </button>
                                </div>
                            </div>
                    </div> 
                    <div className="col-md-4">
                        <button className="btn btn-white bg-primary" type="button" 
                            disabled={newSearch} onClick={handleNewSearch}>
                                New search
                        </button>

                    </div>
                </div>
            </div>
            {/************************************************************/}
            {/* second row will contain information about the car search */}
            {/************************************************************/}
            <div className="row">
                <div className="col-md-12">
                {dataRetrieved ? (
                    //   <ResultsTable books={books} />
                    <h3>There are results to display</h3>
                        ) : (
                      <h3></h3>
                )}

                </div>
            </div>

        </div>
    )
};

export default Selling;