var scriptFunction = (function (data) {

  // If the script.js isn't load from index.html
  // and it's running from command line e.g. node script.js
  if(data.length === 0) {
    console.log('[..this script doesn\'t run in a browser..]');
    var data = require('./dataExport.js');
  } 

  /**
   * Function that filters a given array
   * to match a set of filters/conditions
   * @param: Array data 
   * @param: Object filter 
   * @return: Array results
   */
  function customFilter(dataArray, filterObject) {
    // Iterate through an array of objects and return an array of filtered results
    var results = dataArray.filter(function(elemObject) {
      var valid = true;
      // Iterate through filter Object params
      Object.keys(filterObject).forEach(function (key) { 
        // Check if the provided filter is vaild
        if(elemObject.hasOwnProperty(key)) {
          var type = typeof elemObject[key];
          switch(type) {
            case 'object':
              var search = objectToArray(elemObject[key]);
              break;
            default:
              var search = elemObject[key];  
          }
          // Apply the filter
          if(Array.isArray(search)) {
            if(search.indexOf(filterObject[key]) == -1) { valid = false; return; }
          } else {
            if(search !== filterObject[key]) { valid = false; return; }
          }
        } else {
          throw "err: Invalid Filter Object";
        }
      });  
      return valid;      
    })
    return results;
  }

  /**
   * Function that converts one level object to an array
   * @param: Object obj
   * @return: Array arr
   */
  function objectToArray(obj) {
    var arr = Object.keys(obj).map(function (key) {
      return obj[key];
    });
    return arr;
  }
  
  /* System: call customFilter function */

  //Example 1
  var filterObject1 = {category:'bal'};
  //Example 2
  var filterObject2 = {category:'bal', regions:'shoulders'};
  //Example 3
  var filterObject3 = {category:'bal', regions:'shoulders', ID:'004'};

  try{
    var filteredResults = customFilter(data, filterObject2);
    console.log(filteredResults);
  } catch(e) {
    console.log(e);
  }
  
  // Return this object to have access, from the testing script
  // to these two functions: `customFilter` and `objectToArray`
  return {
    customFilter: customFilter,
    objectToArray: objectToArray
  }

})((typeof data == 'undefined') ? [] : data);


