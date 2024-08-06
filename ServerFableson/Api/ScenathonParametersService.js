const responseApi = (rows, attribute) => {

  var scenathon_id_list = [];
  
  if(rows){
    
    rows.forEach(item => {
  
      scenathon_id_list.push(item[attribute]);

    });

  }

  return scenathon_id_list;

}


const getScenathonMetaData = async (client, attribute, table, condition)  => {
  
    var responseMessage = []

    try {
      var query_to_fetch = 'SELECT DISTINCT "'+ attribute +'" FROM ' + table + ' ' + condition;
        
      const response = await client.query(query_to_fetch, []);

      responseMessage = responseApi(response.rows, attribute);

  
      } catch (error) {
        console.error(error)
      }

      return responseMessage;
}

module.exports = getScenathonMetaData ;