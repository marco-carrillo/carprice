import React from 'react';
import {
  MDBDataTable,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBadge
} from 'mdbreact';

class CarTable extends React.Component {
  state = {
    data: {},
    records:"10",
    gender: "both",
    nationality: "all"
  };

  //*********************************************************/
  //  will wait until component loads before fetching data   /
  //*********************************************************/
  componentDidMount() {
       this.getsRandomEmployees(10);  // Calls to fetch 100 users from API
  }

  //********************************************************************************************/
  //  This function calls the API that returns random names to be included in the dataTable    */
  //********************************************************************************************/
  getsRandomEmployees = () => {

        let rawdata = this.props.cars;

        //****************************************************************************************/
        //  Columns array defines the name of the column, the name of the "rows" array that will 
        //  feed the data for this column, how it will be sorted by default, and its width
        //****************************************************************************************/
        let columns= [
          {
            label: 'Description',
            field: 'description',
            sort: 'asc',
            width: 270
          },
          {
            label: 'VIN',
            field: 'vin',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Price',
            field: 'price',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Delivered',
            field: 'delivered',
            sort: 'asc',
            width: 125
          },
          {
            label: 'Mileage',
            field: 'mileage',
            sort: 'asc',
            width: 100
          },
          {
            label: 'DOM',
            field: 'dom',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Distance',
            field: 'distance',
            sort: 'asc',
            width: 100
          }
        ];

        let rows=[];
        let data=[];
        
        rows=rawdata.map((row,key)=>({
          description: row.heading,
          vin: row.vin,
          price: row.price,
          delivered: row.deliveredprice,
          mileage: row.miles,
          dom: row.dom,
          distance: row.dist
        }));

        //******************************************/
        // Data structure required by MDBootstrap  */
        //******************************************/
        data = {
          columns,
          rows
        };
        this.setState({ data });
  }

  //********************************************************************/
  //  Rendering the datatable with all of the information from users
  //********************************************************************/
  render() {
    const { data } = this.state;
    return (
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    scrollX
                    scrollY
                    maxHeight='400px'
                    data={data}
                  />
    );
  } 
}
export default CarTable;
