function generateAleaMethode()
{
    let nbConstraint = getRandomInt(5);
    
    // maximize function variables
    let x1Val;
    let x2Val;

    // constraints
    let xValues = [];
    let yValues = [];
    let resValues = [];


    // for each constraint, generation of the x and y values
    for(let i=0; i<nbConstraint; i++)
    {
        xValues[i] = getRandomInt(100) + "";
        yValues[i] = getRandomInt(100) + "";
        resValues[i] = getRandomInt(100) + "";
    }

    x1Val = getRandomInt(100) + "";
    x2Val = getRandomInt(100) + "";
    
    
    // creation of the data object
    let data = {
      x1 : xValues,
      x2 : yValues,
      val : resValues,
      obj : {
      		x1 : x1Val + "",
          x2 : x2Val + "",
      }
    };
    
    return data;
}

/**
 * generation of an integer between 0 and max
 * @param {} max 
 */
function getRandomInt(max)
{
    return Math.floor(Math.random() * Math.floor(max+1));
}