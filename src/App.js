import './App.css';
import React, { useState } from 'react'

// import FocusedInput from './components/FocusedInput';
// import FormValidation from './components/FormValidation';
// import DisplayTiles from './components/DisplayTiles';
// import BasicTable from './components/ReactTable/BasicTable';
// import ReactTable from './components/ReactTable/ReactTable';
// import PaginationTable from './components/ReactTable/PaginationTable';
// import RowColumnTable from './components/ReactTable/RowColumnTable';

// import ColorContext from './components/ColorContext';

// import TablePaginationMemo from './components/Tesla/TablePaginationMemo';
// import PhotosList from '../src/components/Tesla/PhotosList'

// import Collapsible from './components/Atlassian/Collapsible';

import TodoListComponent from './components/TodoListComponent';

function App () {

  // const [ color, setColor ] = useState( 'blue' );
  // const changeToGreen = () => setColor( 'green' );

  return (
    <>
      {/* <FocusedInput
        focused={ true }
      /> */}

      {/* <FormValidation />  */ }

      {/* <DisplayTiles
        name={ "sadhana" }
      /> */}

      {/* <BasicTable /> */ }

      {/* <ReactTable /> */ }

      {/* <PaginationTable /> */ }

      {/* <ColorContext.Provider value={ { color, changeToGreen } }>
        <RowColumnTable />
      </ColorContext.Provider> */}


      {/* <TablePaginationMemo /> */}
      {/* <br /><br /><br /><hr /><br /><br /><br /> */}
      {/* <PhotosList /> */}

      {/* <Collapsible /> */ }

      <TodoListComponent />

    </>
  );
}

export default App;
