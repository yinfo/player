import React from 'react';
import { observer, inject } from 'mobx-react';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
import '../bin/react-bootstrap-table.css';

const options = {
  // toolBar: createCustomToolBar,
  insertBtn: createCustomInsertButton,
  deleteBtn: createCustomDeleteButton,
};
const cellEditProp = {
  mode: 'dbclick',
  beforeSaveCell: beforeSaveCell,
};
const selectRow = {
  // mode: 'radio' //radio or checkbox
  mode: 'checkbox',  // multi select
  bgColor: '#fefefe',
  selected: ['1'],
};

function beforeSaveCell(row, cellName, cellValue) {

}

// function onClickButtonPlay(videoStore, cell, row, enumObject, rowIndex) {
//   // console.log('onClickButtonPlay', cell);
//   console.log('videoStore', videoStore);
//   console.log('cell', cell);
//   console.log('row', row);
//   console.log('enumObject', enumObject);
//   console.log('rowIndex', rowIndex);
// }
function cellButton(videoStore, cell, row, enumObject, rowIndex) {
  return (
    <button
      type="button"
      className="btn btn-success btn-sm"
      onClick={() => {
        if (videoStore && row && row.id) {
          videoStore.playVideoById(row.id);
        }
      }}
    >
      Play
    </button>
  );
}

// function createCustomToolBar(props) {
//   return (
//     <div style={{ margin: '15px' }}>
//
//
//       <button
//         type="button"
//         className="btn btn-success btn-sm"
//         onClick={() =>
//           onClickButtonPlay()}
//       >
//         Click me
//       </button>
//       {props.components.btnGroup}
//
//
//       {/*<div className='col-xs-8 col-sm-4 col-md-4 col-lg-2'>*/}
//       {/*{ props.components.searchPanel }*/}
//       {/*</div>*/}
//     </div>
//   );
// }
const VideoList = ({ videoStore }) => (
  <BootstrapTable
    data={videoStore.videos}
    cellEdit={cellEditProp}
    insertRow
    deleteRow
    selectRow={selectRow}
    options={options}
    // tableHeaderClass = {"col-hidden"}
  >
    <TableHeaderColumn dataField='id' isKey width='20px'>ID</TableHeaderColumn>
    <TableHeaderColumn dataField='title'>title </TableHeaderColumn>
    <TableHeaderColumn dataField='videoId' width='60px'>videoId</TableHeaderColumn>
    <TableHeaderColumn dataField='startSeconds' width='60px'>Start</TableHeaderColumn>
    <TableHeaderColumn dataField='endSeconds' width='60px'>End</TableHeaderColumn>
    <TableHeaderColumn dataField='button'
                       dataFormat={cellButton.bind(null, videoStore)}
                       width='100px'>
    </TableHeaderColumn>
  </BootstrapTable>
);

function handleInsertButtonClick(onClick) {
  // Custom your onClick event here,
  // it's not necessary to implement this function if you have no any process before onClick
  console.log('This is my custom function for InserButton click event');
  onClick();
}

function createCustomInsertButton(onClick) {
  return (
    <InsertButton
      btnText='Добавить'
      btnContextual='btn-success'
      className='btn btn-success btn-sm'
      onClick={() => handleInsertButtonClick(onClick)}/>
  );
}

function handleDeleteButtonClick(onClick) {
  // Custom your onClick event here,
  // it's not necessary to implement this function if you have no any process before onClick
  console.log('This is my custom function for DeleteButton click event');
  onClick();
}

function createCustomDeleteButton(onClick) {
  return (
    <DeleteButton
      btnText='Удалить'
      btnContextual='btn-warning'
      className='my-custom-class'
      onClick={() => handleDeleteButtonClick(onClick)}/>
  );
}

export default inject('videoStore')(observer(VideoList));





