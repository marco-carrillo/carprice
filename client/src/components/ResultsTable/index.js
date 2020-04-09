//**********************************************************************************/
//  Following component will load a dataTable with all of the information required */
//  so that the user can see all of the books returned by the Google books API     */
//**********************************************************************************/
import React, {useState,useEffect} from "react";
import axios from "axios";

function ResultsTable(props){
    let data=props.books;
    const [btncolor, setbtncolor] = useState(Array(data.length).fill("#20c997"));
    const [btntext, setbtntext] = useState(Array(data.length).fill("Save"));

    useEffect(() => {
 
      }, [btncolor])
   
  
    //***************************************************************************/
    //  If user clicks on "save" button, then calls API to save the information */
    //  in the MongoDb collection                                               */
    //***************************************************************************/
    function saveBook(bookInfo,index){
        axios.post('/api/books',bookInfo)
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
                    <th className="col" style={{width: "20%"}}>Book name</th>
                    <th className="col" style={{width: "15%"}}>Author</th>
                    <th className="col" style={{width: "45%"}}>Synopsis</th>
                    <th className="col" style={{width: "10%"}}>actions</th>
                </tr>
            </thead>

            <tbody>
                {data.map((book,index)=>{
                    return(
                        <tr key={book.id}>
                            <td data-th="Image" className="align-middle text-center">
                                <img src={book.image} alt="book pic" className="img-responsive"/>
                            </td>
                            <td data-th="Title" className="align-middle">
                                {book.title}
                            </td>
                            <td data-th="Author" className="align-middle">
                                    {book.author}
                            </td>
                            <td data-th="Synopsis" className="align-middle">
                                {book.synopsis}
                            </td>
                            <td data-th="actions" className="align-middle text-center">
                    <button className="btn" style={{backgroundColor: btncolor[index]}} onClick={() => saveBook(book,index)}>{btntext[index]}</button> <br/>
                                <a href={book.link} target="_blank" rel="noopener noreferrer">
                                    <button className="btn mt-3" style={{backgroundColor: "#20c997"}}>View</button>
                                </a>
                            </td>
                        </tr>
                    )
                 })}
            </tbody>
        </table>
    )
}

export default ResultsTable;