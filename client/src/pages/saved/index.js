//**************************************************************************/
//  This function will call the server API to get all of the saved cars,  */
//  The user will then be able to delete or view the cars.                */
//**************************************************************************/
import React,{ useState, useEffect } from "react";
import axios from "axios";
import ResultsTable from "./ResultsTable";

function Saved(){
  const [cars, setCars] = useState([])

  //***********************************************/
  // Loading cars upon loading the application    */
  //***********************************************/
  useEffect(() => {
    loadCars()
  }, [cars])

  //****************************************************/
  // Calls the API to get all saved books on the table */ 
  //****************************************************/
  function loadCars() {
    axios.get('/api/cars')
      .then(res => {setCars(res.data)})
      .catch(err => console.log(err));
  };

    return(
      <div>
        {/*************************************************************************/}
        {/* First row, this will show the header showing this are the books saved */}
        {/*************************************************************************/}
          <div className="jumbotron jumbotron-fluid bg-info text-white my-2 pt-3 pb-1">
            <h4 className="text-center">Interesting cars saves</h4>
          </div>

        {/********************************************************************************/}
        {/* second row, this will show a datatable with the results from the books saved */}
        {/********************************************************************************/}

          <div className="row">
              <div className="col" size="md-12">
                {cars.length ? (
                    <ResultsTable cars={cars} />
                ) : (
                        <h3>No Results to Display</h3>
                    )}
              </div>
          </div>
        </div>
      )
}

export default Saved;