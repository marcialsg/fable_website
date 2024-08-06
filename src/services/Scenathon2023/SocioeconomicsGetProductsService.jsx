const responseApi = async (response, props) => {

  var countryProducts = [];
  
  console.log("SocioeconomicsGetProductsService responseApi response 1: ", response);
  
  response = response.queryResponse;

  response.forEach((item) => {

    countryProducts.push(item.product);

  });

  const data = {
    products: countryProducts
  };

  console.log("SocioeconomicsGetProductsService data: ", data);

  return data;
};

export default function getSocioeconomicsProducts(target, props) {
  try {
    const indicator = "get_country_products";
    const url = `${target}/get_country_products/`;
    const query = `${process.env.REACT_APP_URL}${url}${JSON.stringify(props)}`;
    console.log("SocioeconomicsGetProductService query: ", query);
    console.log("SocioeconomicsGetProductService indicators: ", indicator);

    return fetch(query)
      .then((res) => res.json())
      .then((res) => responseApi(res, props));  
  } catch (error) {
    console.error(error);
  }
}