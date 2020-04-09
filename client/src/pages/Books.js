//**************************************************************/
//  This component will display the entire Google Search pages */
//**************************************************************/
import React, { useState, useEffect } from "react";
import SearchBox from "../components/SearchBox";
import ResultTitle from "../components/ResultTitle";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import "./style.css";
import ResultsTable from "../components/ResultsTable"
import axios from "axios";

function Books() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  //*******************************************************************/
  // No default action at loading time.  Leaving stub for future use  */
  //*******************************************************************/
  useEffect(() => {
  }, [])

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

    axios.get('/api/books/google',{params: { search: formObject.bookname}})
      .then(res => {
        let results=[];
        let record={};
        res.data.items.forEach(result=>{
          record={};
          record.id=(result.id) ? result.id : Math.floor(Math.random()*1000000);
          record.title=(result.volumeInfo.title) ? result.volumeInfo.title : "Sorry, no information from Google";
          record.author=(result.volumeInfo.authors) ? result.volumeInfo.authors[0] : "Sorry, no information from Google";
          record.synopsis=(result.volumeInfo.description) ? result.volumeInfo.description : "Sorry, no information from Google";
          record.image=(result.volumeInfo.imageLinks) ? result.volumeInfo.imageLinks.thumbnail : "https://books.google.com/googlebooks/images/no_cover_thumb.gif";
          record.link=(result.volumeInfo.previewLink) ? result.volumeInfo.previewLink : "Sorry, no information from Google";
          results.push(record);
         
        });
        setBooks(results);
      })
      .catch(error=>console.log(error));
  };

    return (
      <Container fluid>
        {/***************************************************************/}
        {/* First row, will contain the header information for this app */}
        {/***************************************************************/}
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h2>(React) Google Books Search</h2>
              <h4>Search for and Save Books of Interes</h4>
            </Jumbotron>
          </Col>
          </Row>

        {/***************************************************************/}
        {/* Second row, will contain the book search parameters that    */}
        {/* user has to provide to search for books                     */}
        {/***************************************************************/}
        <Row>
          <Col size="md-12">
            <SearchBox>
              <h4 className="text-left">Book</h4>
              <form>
                  <Input
                    onChange={handleInputChange}
                    name="bookname"
                    placeholder="Harry Potter"/>
                  <FormBtn
                    disabled={!formObject.bookname}
                    onClick={handleFormSubmit}>
                    <h4>Search Book</h4>
                  </FormBtn>
              </form>
            </SearchBox>
          </Col>
        </Row>

        {/********************************************************************************/}
        {/* Third row, this will show a datatable with the results from the books search */}
        {/********************************************************************************/}
        <Row>
          <Col size="md-12">
              <ResultTitle>
                  <h3>Results from Search</h3>
                </ResultTitle>
        
          </Col>
        </Row>

        {/********************************************************************************/}
        {/* Fourth row, this will show a datatable with the results from the books search */}
        {/********************************************************************************/}
        <Row>
          <Col size="md-12">
            {books.length ? (
              <ResultsTable books={books} />
            ) : (
                  <h3>No Results to Display</h3>
                )}
            </Col>
        </Row>
      </Container>
    );
  }


export default Books;