//**********************************************************************************/
//  Following component will load a dataTable with all of the information required */
//  so that the user can see all of the cars returned by the API                   */
//**********************************************************************************/
import React, {useState} from "react";
import axios from "axios";
import NumbersWithCommas from '../../utils/NumbersWithCommas';
import './ResultsTable.style.css'

function ResultsTable(props){
    let data=props.cars;
    const [btncolor, setbtncolor] = useState(Array(data.length).fill("#20c997"));
    const [btntext, setbtntext] = useState(Array(data.length).fill("Save"));
 
    //***************************************************************************/
    //  If user clicks on "save" button, then calls API to save the information */
    //  in the MongoDb collection                                               */
    //***************************************************************************/
    function saveCar(carInfo,index){
        axios.post('/api/cars',carInfo)
             .then(response=>{
                 console.log(`Successful response: ${response}`);

                 //*************************************/
                 //  Updating color and text of button */
                 //*************************************/
                 let x=[];
                 btncolor.forEach(color=>x.push(color));
                 x[index]="yellow";
                 setbtncolor(x);

                 let t=[];
                 btntext.forEach(text=>t.push(text));
                 t[index]="Saved"
                 setbtntext(t);
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
                    <th className="col" style={{width: "9%"}}>Price</th>
                    <th className="col" style={{width: "9%"}}>Delivered Price</th>
                    <th className="col" style={{width: "9%"}}>Mileage</th>
                    <th className="col text-center" style={{width: "5%"}}>DOM</th>
                    <th className="col" style={{width: "15%"}}>Source</th>
                    <th className="col text-center" style={{width: "7%"}}>Distance</th>
                    <th className="col text-center" style={{width: "7%"}}>Option</th>
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
                            <td data-th="DeliveredPrice" className="align-middle">
                                ${NumbersWithCommas(car.deliveredprice)}
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
                            <td data-th="Options" className="align-middle text-center">
                                <button className="btn" style={{backgroundColor: btncolor[index]}} onClick={() => saveCar(car,index)}>{btntext[index]}</button> <br/>
                            </td>
                        </tr>
                    )
                 })}
            </tbody>
        </table>
    )
}

export default ResultsTable;