import { parse } from "pg-connection-string";

const responseApi =  (response, year) => {

  console.log('CLIENT responseApi response: ', response);
  const repsonseObject = JSON.parse(response);
  console.log('CLIENT responseApi repsonseObject: ', repsonseObject);

  return repsonseObject[year]["scenathon_id"];

}


const getScenathonMetaData = async (year) => {

  console.log('CLIENT getScenathonMetaData, year: ', year);

  var responseMessage = []

  try {
    
    return fetch(`${process.env.REACT_APP_URL}cache`).then(res => res.json()).then(response => responseApi(response, year));

  } catch (error) {
    console.error(error)
  }

  return responseMessage;
}


export default getScenathonMetaData;