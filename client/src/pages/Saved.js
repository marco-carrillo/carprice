//**************************************************************************/
//  This function will call the server API to get all of the saved books,  */
//  The user will then be able to delete or view the books.                */
//**************************************************************************/
import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Container } from "../components/Grid";
import ResultTitle from "../components/ResultTitle"
import SavedBooks from "../components/SavedBooks";

function Saved(){
  const [books, setBooks] = useState([])

  //*******************************************************************/
  // Loading books upon   */
  //*******************************************************************/
  useEffect(() => {
    loadBooks()
  }, [books])

  //****************************************************/
  // Calls the API to get all saved books on the table */ 
  //****************************************************/
  function loadBooks() {
    axios.get('/api/books')
      .then(res => {setBooks(res.data)})
      .catch(err => console.log(err));
  };

    return(
        <Container fluid>
        {/*************************************************************************/}
        {/* First row, this will show the header showing this are the books saved */}
        {/*************************************************************************/}
          <Row>
              <Col size="md-12">
                  <ResultTitle>
                      <h3>Books saved in database</h3>
                  </ResultTitle>
          
              </Col>
          </Row>

        {/********************************************************************************/}
        {/* second row, this will show a datatable with the results from the books saved */}
        {/********************************************************************************/}

          <Row>
              <Col size="md-12">
                {books.length ? (
                    <SavedBooks books={books} />
                ) : (
                        <h3>No Results to Display</h3>
                    )}
              </Col>
          </Row>
          </Container>
      )
}

export default Saved;