
export default function updateScenathonCacheService(target, indicator, props) {
  try {
    const url = `update_cache`;
    const query = `${process.env.REACT_APP_URL}${url}`;

    console.log("UpdateScenathonCacheService query: ", query);
    return fetch(query)
      .then((res) => res.json())
      
  } catch (error) {
    console.error(error);
  }
}
