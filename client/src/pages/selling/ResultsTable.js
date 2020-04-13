//**********************************************************************************/
//  Following component will load a dataTable with all of the information required */
//  so that the user can see all of the books returned by the Google books API     */
//**********************************************************************************/
import React from "react";
import axios from "axios";
import NumbersWithCommas from '../../utils/NumbersWithCommas';
import './ResultsTable.style.css'

function ResultsTable(props){
    let data=props.cars;
 
    //***************************************************************************/
    //  If user clicks on "save" button, then calls API to save the information */
    //  in the MongoDb collection                                               */
    //***************************************************************************/
    function saveBook(bookInfo,index){
        axios.post('/api/books',bookInfo)
             .then(response=>{
                 console.log(`Successful response: ${response}`);

            })
             .catch(error=>{
                 console.log(`Error received: ${error}`);
             })
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th className="col" style={{width: "10%"}}>Image</th>
                    <th className="col" style={{width: "20%"}}>Description</th>
                    <th className="col" style={{width: "10%"}}>VIN</th>
                    <th className="col" style={{width: "10%"}}>Price</th>
                    <th className="col" style={{width: "10%"}}>Mileage</th>
                    <th className="col text-center" style={{width: "10%"}}>DOM</th>
                    <th className="col" style={{width: "20%"}}>Source</th>
                    <th className="col text-center" style={{width: "10%"}}>Distance</th>
                </tr>
            </thead>

            <tbody>
                {data.map((car,index)=>{
                    return(
                        <tr key={car.id}>
                            <td data-th="Image" className="align-middle text-center">
                                <a href={car.vdp_url} target="_blank" rel="noopener noreferrer">
                                    <img src={(car.media) ? (car.media.photo_links[0]) : require("../../pictures/3ZUsNJhi_Ik.jpg")} 
                                    alt="car pic" className="img-responsive car-pic"/>
                                </a>
                            </td>
                            <td data-th="Description" className="align-middle">
                                {car.heading}
                            </td>
                            <td data-th="VIN" className="align-middle">
                                    {car.vin}
                            </td>
                            <td data-th="Price" className="align-middle">
                                ${NumbersWithCommas(car.price)}
                            </td>
                            <td data-th="Mileage" className="align-middle">
                                {NumbersWithCommas(car.miles)}
                            </td>
                            <td data-th="DOM" className="align-middle text-center">
                                {car.dom}
                            </td>
                            <td data-th="Source" className="align-middle">
                                {car.source}
                            </td>
                            <td data-th="Distance" className="align-middle text-center">
                                {NumbersWithCommas(car.dist)}
                            </td>
                        </tr>
                    )
                 })}
            </tbody>
        </table>
    )
}

export default ResultsTable;