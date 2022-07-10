import React from 'react';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

import './App.scss';

import { Table } from './components/Table';
import { Editor } from './components/Editor';

const startColumns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];

function App() {
  const [columns, setColumns] = React.useState(startColumns);

  return (
    <div className="App">
      <div className="wrapper">
        <Table columns={columns} />
        <Editor setColumns={setColumns} columns={columns} />
      </div>
    </div>
  );
}

export default App;
