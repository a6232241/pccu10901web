import React, { useState, useEffect } from 'react';

import ShowTable from './ShowTable';
import svgAPI from '../../APIs/svgAPI';

import LANG from '../../languages/zh-tw.json';

export default function TemplatePage() {
  const [datas, setDatas] = useState([]);
  const head = {
    name: LANG.name,
  };
  const columns = ['name'];

  useEffect(() => {
    // setInitialDatas
    svgAPI.getAllSVG().then((res) => {
      const initialDatas = res.data.data;
      const dataArray = [];
      initialDatas.forEach((initialData) => {
        dataArray.push({
          id: initialData.id,
          name: initialData.name,
          data: initialData.data,
        });
      });
      setDatas(dataArray);
    });
  }, []);

  return (
    <>
      <ShowTable
        head={head}
        columns={columns}
        datas={datas}
        setDatas={setDatas}
        deleteData={deleteData}
      />
      <a href="/template">{LANG.create_svg}</a>
    </>
  );
}

const deleteData = (id) => {
  svgAPI
    .deleteSVG(id)
    .then((res) => {})
    .catch((err) => {
      console.error(err);
    });
};
