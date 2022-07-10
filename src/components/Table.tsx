import React from 'react';
import DataGrid, { Column, Editing } from 'devextreme-react/data-grid';
import data from '../data.json';
import schema from '../report-config.json';
import tv4 from 'tv4';

interface TableProps {
  columns: string[];
}

export const Table: React.FC<TableProps> = ({ columns }) => {
  React.useEffect(() => {
    try {
      const valid = tv4.validate(data, schema);
      if (!valid) {
        throw new Error();
      }
      console.log('Schema is valid');
    } catch (error) {
      alert('Scheme is not valid');
      console.error(tv4.error);
    }
  }, []);

  return (
    <div className="report">
      <p>Окно предварительного просмотра отчёта</p>

      {columns.length ? (
        <DataGrid
          dataSource={data}
          allowColumnReordering={true}
          allowColumnResizing={true}
          columnAutoWidth={true}
          showBorders={true}>
          <Editing mode="cell" allowUpdating={true} />
          {columns.map((column, i) => (
            <Column key={i} dataField={column} />
          ))}
        </DataGrid>
      ) : (
        <h1>Empty</h1>
      )}
    </div>
  );
};
