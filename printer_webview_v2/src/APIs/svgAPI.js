import api from './api';
import shortid from 'shortid';

const svgAPI = {};

svgAPI.getAllSVG = () => {
  return new Promise((resolve, reject) => {
    let res = {
      data: {
        data: [],
      },
    };
    for (let i in localStorage) {
      if (localStorage.getItem(i) != null) {
        try {
          let svgData = JSON.parse(localStorage.getItem(i));
          res.data.data.push(svgData);
        } catch (e) {
          console.log('');
        }
      }
    }
    resolve(res);
  });
};

svgAPI.createSVG = (newSVG) => {
  return new Promise((resolve, reject) => {
    let id = shortid.generate();
    newSVG.id = id;
    localStorage.setItem(id, JSON.stringify(newSVG));
    resolve();
  });
};

svgAPI.getSVG = (id) => {
  return new Promise((resolve, reject) => {
    let res = {
      data: {
        data: JSON.parse(localStorage.getItem(id)),
      },
    };
    resolve(res);
  });
};

svgAPI.editSVG = (id, newSVG) => {
  return new Promise((resolve, reject) => {
    localStorage.setItem(id, JSON.stringify(newSVG));
    resolve();
  });
};

svgAPI.deleteSVG = (id) => {
  return new Promise((resolve, reject) => {
    localStorage.removeItem(id);
    resolve();
  });
};

svgAPI.printSVG = (id) => {
  const url = `/svg/print/${id}`;
  return api.fire({
    url,
    headers: {
      'Content-Type': 'application/json, image/svg+xml',
    },
    method: 'GET',
    // responseType: 'arraybuffer',
  });
};

export default svgAPI;
