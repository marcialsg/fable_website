import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead
} from 'mdbreact';

const TablePage = props => {

  const checkAllHandler = () => {
    setAreAllChecked(areAllChecked ? false : true);
  };

  const checkHandler = id => {
    let currentChecked = [...checked];

    currentChecked.map((checkbox, index) => {
      if ((index + 1) === id){
        checkbox.checked = !checkbox.checked;
      }

      return checkbox;
    })

    setChecked(currentChecked);
  }

 const [areAllChecked, setAreAllChecked] = useState(false);
 const [checked, setChecked] = useState([
   {
     id: 1,
     checked: false,
   },
   {
     id: 2,
     checked: false,
   },
   {
     id: 3,
     checked: false,
   },
   {
     id: 4,
     checked: false,
   },
   {
     id: 5,
     checked: false,
   },
 ])

  const data = 
    {
      columns: [
        {
          label: (
            <MDBInput
              label=' '
              type='checkbox'
              id='checkbox5'
              onClick={checkAllHandler}
            />
          ),
          field: 'check',
          sort: 'asc'
        },
        {
          label: 'First Name',
          field: 'first',
          sort: 'asc'
        },
        {
          label: 'Last Name',
          field: 'last',
          sort: 'asc'
        },
        {
          label: 'Username',
          field: 'username',
          sort: 'asc'
        },
        {
          label: 'Username',
          field: 'username2',
          sort: 'asc'
        },
        {
          label: 'Username',
          field: 'username3',
          sort: 'asc'
        },
        {
          label: 'Username',
          field: 'username4',
          sort: 'asc'
        }
      ],
      rows: [
        {
          check: <MDBInput label=' ' checked={areAllChecked ? true : checked[0].checked} type='checkbox' id='checkbox6'  onClick={() => checkHandler(1)}/>,
          first: 'Mark',
          last: 'Otto',
          username: '@mdo',
          username2: 'Mark',
          username3: 'Otto',
          username4: '@mdo'
        },
        {
          check: <MDBInput label=' ' checked={areAllChecked  ? true : checked[1].checked} type='checkbox' id='checkbox7'  onClick={() => checkHandler(2)}/>,
          first: 'Jacob',
          last: 'Thornton',
          username: '@fat',
          username2: 'Jacob',
          username3: 'Thornton',
          username4: '@fat'
        },
        {
          check: <MDBInput label=' ' checked={areAllChecked  ? true : checked[2].checked} type='checkbox' id='checkbox8'  onClick={() => checkHandler(3)}/>,
          first: 'Larry',
          last: 'the Bird',
          username: '@twitter',
          username2: 'Larry',
          username3: 'the Bird',
          username4: '@twitter'
        },
        {
          check: <MDBInput label=' ' checked={areAllChecked  ? true : checked[3].checked} type='checkbox' id='checkbox9'  onClick={() => checkHandler(4)}/>,
          first: 'Paul',
          last: 'Topolski',
          username: '@P_Topolski',
          username2: 'Paul',
          username3: 'Topolski',
          username4: '@P_Topolski'
        },
        {
          check: <MDBInput label=' ' checked={areAllChecked  ? true : checked[4].checked} type='checkbox' id='checkbox10' onClick={() => checkHandler(5)} />,
          first: 'Larry',
          last: 'the Bird',
          username: '@twitter',
          username2: 'Larry',
          username3: 'the Bird',
          username4: '@twitter'
        }
      ]
    }


  return (
    <MDBCard narrow>
      <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
        <div>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fa fa-th-large mt-0"></i>
          </MDBBtn>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fa fa-columns mt-0"></i>
          </MDBBtn>
        </div>
        <a href="#a" className="white-text mx-3">Table name</a>
        <div>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fas fa-pencil-alt mt-0"></i>
          </MDBBtn>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fas fa-times mt-0"></i>
          </MDBBtn>
          <MDBBtn outline rounded size="sm" color="white" className="px-2">
            <i className="fa fa-info-circle mt-0"></i>
          </MDBBtn>
        </div>
      </MDBCardHeader>
      <MDBCardBody cascade>
        <MDBTable btn fixed>
          <MDBTableHead columns={data.columns} />
          <MDBTableBody rows={data.rows} />
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
};

export default TablePage;