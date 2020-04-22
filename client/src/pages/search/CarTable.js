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
import "./CarTable.style.css"

class CarTable extends React.Component {
  state = { data: {} };

  //*********************************************************/
  //  will wait until component loads before fetching data   /
  //*********************************************************/
  componentDidMount() {
       this.getsCars();
  }

  //************************************************************************************/
  //  The following function will open a new tab with the URL passed by the Datatable   /
  //  that was clicked by the user.                                                     /
  //************************************************************************************/
  handleClick=(link)=>{
    window.open(link,"_blank");
  }

  //********************************************************************************************/
  //  This function calls the API that returns random names to be included in the dataTable    */
  //********************************************************************************************/
  getsCars = () => {

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
          distance: row.dist,
          clickEvent: () => this.handleClick(row.vdp_url)
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
