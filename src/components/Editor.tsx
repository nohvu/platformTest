//@ts-nocheck
import React from 'react';
import delLogo from '../assets/Delete.png';
import editLogo from '../assets/Edit.png';
import checkLogo from '../assets/check.png';
import data from '../data.json';

interface EditorProps {
  columns: string[];
  setColumns: (array: any) => void;
}

export const Editor: React.FC<EditorProps> = ({ columns, setColumns }) => {
  let count = React.useRef(1);
  const [isActive, setIsActive] = React.useState({
    '0': false,
  });

  const addColumn = () => {
    setColumns((prev: string[]) => [...prev, `New Column ${count.current}`]);
    count.current++;
  };

  const deleteColumn = (index: number) => {
    setColumns((prev: string[]) => prev.filter((_, i) => i !== index));
  };

  const changeColumnValue = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCol = [...columns];
    newCol[index] = event.target.value;
    setColumns(newCol);
    data.map(
      (elem, i) =>
        !elem.hasOwnProperty(event.target.value) && (elem[event.target.value] = elem[value]),
    );
  };

  const editColumn = (index: number) => {
    setIsActive((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="edit">
      <p>Список колонок</p>
      <ul>
        {columns.map((col, index) => (
          <div key={index} className="row">
            <li>
              <input
                disabled={!isActive[index]}
                onChange={(event) => changeColumnValue(col, event, index)}
                value={col}
              />
            </li>
            <div className="img">
              <button onClick={() => deleteColumn(index)}>
                <img width={20} height={20} src={delLogo} alt="delete"></img>
              </button>
              <button onClick={() => editColumn(index)}>
                <img
                  width={20}
                  height={20}
                  src={!isActive[index] ? editLogo : checkLogo}
                  alt="edit"></img>
              </button>
            </div>
          </div>
        ))}
      </ul>
      <button onClick={addColumn}>Добавить колонку</button>
    </div>
  );
};
