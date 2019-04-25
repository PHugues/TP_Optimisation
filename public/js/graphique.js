// Find all the intersection point
function intersection(x1Array, x2Array, resArray)
{
    let i;
    let x1;
    let x2;
    let pointArray = [];

    const equationsNumber = x1Array.length;
    
    for(i=0; i<equationsNumber; i=i+1)
    {
        let coordinates = [];

        if(x1Array[i] != 0)
        {
        		coordinates = [];
            x1 = resArray[i] / x1Array[i];
            coordinates.push(x1);
            coordinates.push(0);
            pointArray.push(coordinates);
        }
        if(x2Array[i] != 0)
        {
        		coordinates = [];
            x2 = resArray[i] / x2Array[i];
            coordinates.push(x2);
            coordinates.push(0);
            pointArray.push(coordinates);
        }
    }

    if(equationsNumber > 1)
    {
        for(i=0; i<equationsNumber; i=i+1)
        {
            let j;
            for(j=i+1; j<equationsNumber; j=j+1)
            {
                let intersection = linesEquality(x1Array[i], x1Array[j], x2Array[i], x2Array[j], resArray[i], resArray[j]);
                pointArray.push(intersection);
            }
        }
    }
    
    return pointArray;
}


// Return the intersection between two lines
// ...x11 + ...x21 => x11 = First x1
// ...x12 + ...x22
function linesEquality(x11, x12, x21, x22, res1, res2)
{
    let intersection = [];

    // Coordinates
    let x;
    let y;

    // Check if the values of the first equation are not smaller than those of the second equation
    if(x21 < x22)
    {
    		let swapObject = swap(x11, x12);
        x11 = swapObject.first;
        x12 = swapObject.second;
        let swapObject2 = swap(x21, x22);
        x21 = swapObject2.first;
        x22 = swapObject2.second;
        let resSwap = swap(res1, res2);
        res1 = resSwap.first;
        res2 = resSwap.second;
    }


    // Removal of x2 values
    let divisor = x21 / x22;
    let nbX1 = x11 - (x12 * divisor);
    // let nbX2 = x21 - (x22 * divisor);
    let res = res1 - (res2 * divisor);

    if(nbX1 < 0)
    {
        nbX1 = nbX1 * (-1);
        res = res * (-1);
    }
    if(nbX1 !== 1)
    {
    		res = res / nbX1;
        nbX1 = nbX1 / nbX1;
    }
    x = res;
    console.log("x " + x);
    
    
    if(x11 < x12)
    {
        let swapObject = swap(x11, x12);
        x11 = swapObject.first;
        x12 = swapObject.second;
        let swapObject2 = swap(x21, x22);
        x21 = swapObject2.first;
        x22 = swapObject2.second;
        let resSwap = swap(res1, res2);
        res1 = resSwap.first;
        res2 = resSwap.second;
    }
    // Removal of x1 values
    divisor = x11 / x12;
    // nbX1 = x11 - (x12 * divisor);
    nbX2 = x21 - (x22 * divisor);
    res = res1 - (res2 * divisor);

    if(nbX2 < 0)
    {
        nbX2 = nbX2 * (-1);
        res = res * (-1);
    }
    if(nbX2 != 1)
    {
    	res = res / nbX2;
        nbX2 = nbX2 / nbX2;
    }
    y = res;
    
    intersection.push(x);
    intersection.push(y);

    return intersection;
}


// Return an object with the two values exchanged
// Key 1 = first
// Key 2 = second
function swap(val1, val2)
{
    let val3 = val1;
    val1 = val2;
    val2 = val3;
    
    var swapObject = {first:val1, second:val2};
    return swapObject;
}


function isAvailable(pointArray, x1Array, x2Array, resArray)
{
    let x;
    let y;
    
    for(let i=0; i<pointArray.length; i++)
    {
        
    }
}
