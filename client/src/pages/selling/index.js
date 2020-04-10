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
  function handleFormSubmit(event) {
    event.preventDefault();
    setnewSearch(false);
    alert(`got clicked with ${formObject.VIN}`)

      //******************************************/
      //  Setting the API query to call the API  */
      //******************************************/
      let lat=37.42;
      let long=-77.68;
      console.log(process.env.REACT_APP_MKTCHECK_APIKEY)
      console.log(process.env.REACT_APP_MKTCHECK_APIKEY);

      let APIQuery=`http://api.marketcheck.com/v2/search/car/active`+
                    `?api_key={{${process.env.REACT_APP_MKTCHECK_APIKEY}}}`+
                    `&vins=${formObject.VIN}&latitude=${lat}&longitude=${long}` +
                    `&radius=100&car_type=used&start=0&rows=100`;
    
      //********************/
      //  Calling the API  */
      //********************/
      axios.get(APIQuery)
           .then(res=>{
               const vehicles=res.data;
               localStorage.setItem("carresults",JSON.stringify(vehicles));
               console.log(res.data);
           })

  };

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