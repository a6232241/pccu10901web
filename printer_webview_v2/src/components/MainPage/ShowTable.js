import React from 'react';
import { Table } from 'react-bootstrap';

import LANG from '../../languages/zh-tw.json';

export default function ShowTable({
  head,
  columns,
  datas,
  setDatas,
  deleteData,
}) {
  const showDatas =
    Array.isArray(columns) && columns.length > 0
      ? datas.reduce((reducer, data) => {
          const tmp = columns.reduce((prev, column) => {
            if (data.hasOwnProperty(column)) {
              prev[column] = data[column];
            }
            return prev;
          }, {});
          return reducer.concat(tmp);
        }, [])
      : datas;

  return (
    <Table striped bordered hover size="sm">
      <TableHead head={head} />
      <TableBody
        datas={datas}
        showDatas={showDatas}
        setDatas={setDatas}
        deleteData={deleteData}
      />
    </Table>
  );
}

function TableHead({ head }) {
  const THead = [];
  Object.keys(head).forEach((key) => {
    THead.push(<th key={key}>{head[key]}</th>);
  });
  THead.push(<th key="delete">{LANG.delete}</th>);
  return (
    <thead>
      <tr>{THead}</tr>
    </thead>
  );
}

function TableBody({ datas, showDatas, setDatas, deleteData }) {
  const TBody = [];
  datas.forEach((data, i) => {
    TBody.push(
      <tr key={i}>
        <TableData
          data={datas[i]}
          showData={showDatas[i]}
          setData={(newData) => {
            const newDatas = [...datas];
            newDatas[i] = newData;
            setDatas(newDatas);
          }}
        />
        <td key={i}>
          <input
            type="button"
            value="Delete"
            onClick={() => {
              deleteData(datas[i].id);
              const newDatas = [...datas];
              newDatas.splice(i, 1);
              setDatas(newDatas);
            }}></input>
        </td>
      </tr>,
    );
  });
  return <tbody>{TBody}</tbody>;
}

function TableData({ data, showData, setData }) {
  const TData = [];
  Object.keys(showData).forEach((key) => {
    TData.push(
      <TableItem key={key} item={showData[key]} href={`/template?id=${data.id}`} />,
    );
  });
  return TData;
}

function TableItem({ item, href }) {
  return (
    <td>
      <a href={href}>{item}</a>
    </td>
  );
}
