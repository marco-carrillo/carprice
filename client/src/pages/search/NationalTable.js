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


class NationalTable extends React.Component {
  state = {
    data: {},
  };

  //########################################/
  //  Calculating mileage ranges by states  /
  //########################################/
  getCarsbyMileage = (mileageClass)=>{
    let carSubset=this.props.cars.filter(function(car){
      return car.milesclass===mileageClass
    })

    console.log(carSubset);


  }



  //************************************************************************************/
  //  This function process all of the information to get the table ready for display  */
  //************************************************************************************/
  getsTableData = (cars) => {

        let rawdata = cars;

        //****************************************************************************************/
        //  Columns array defines the name of the column, the name of the "rows" array that will 
        //  feed the data for this column, how it will be sorted by default, and its width
        //****************************************************************************************/
        let columns= [
          {
            label: 'State',
            field: 'state',
            sort: 'asc',
            width: 100
          },
          {
            label: '0-10K miles',
            field: 'to10K',
            sort: 'asc',
            width: 100
          },
          {
            label: '10-20K miles',
            field: 'to20K',
            sort: 'asc',
            width: 100
          },
          {
            label: '20K-30K miles',
            field: 'to30K',
            sort: 'asc',
            width: 100
          },
          {
            label: '30K-40K miles',
            field: 'to40K',
            sort: 'asc',
            width: 100
          },
          {
            label: '40K-50K miles',
            field: 'to50K',
            sort: 'asc',
            width: 100
          },
          {
            label: '50k-60K miles',
            field: 'to60K',
            sort: 'asc',
            width: 100
          },
          {
            label: '60-70K miles',
            field: 'to70K',
            sort: 'asc',
            width: 100
          },
          {
            label: '70K-80K miles',
            field: 'to80K',
            sort: 'asc',
            width: 100
          },
          {
            label: '80-90K miles',
            field: 'to90K',
            sort: 'asc',
            width: 100
          },
          {
            label: '90K-100K miles',
            field: 'to100K',
            sort: 'asc',
            width: 100
          }
        ];

        let rows=[];
        let data=[];
        
        //************************************/
        //  Preparing the data for the chart */
        //************************************/
        for(let i=0;i<10;i++){
          rows.push(this.getCarsbyMileage(i));
        }


            // rows=rawdata.map((row,key)=>({
            //   name: `${row.name.title} ${row.name.first} ${row.name.last}`,
            //   gender: row.gender,
            //   email: row.email,
            //   age: row.dob.age,
            //   phone: row.phone,
            //   cell: row.cell,
            //   office: row.nat
            // }));

        //******************************************/
        // Data structure required by MDBootstrap  */
        //******************************************/
        data = {
          columns,
          rows
        };
        // this.setState({ data });
      }


  //********************************************************************/
  //  Rendering the datatable with all of the information from users
  //********************************************************************/
  render() {
    const { data } = this.state;
    console.log(this.props.cars);
    this.getsTableData();
    return (
      <MDBContainer className='mt-3'>
        <div>
              <MDBCard>
                <MDBCardBody>
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    scrollX
                    scrollY
                    maxHeight='400px'
                    data={data}
                  />
                </MDBCardBody>
              </MDBCard>
        </div>
      </MDBContainer>
    );
  } 
}

export default NationalTable;
