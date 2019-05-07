function isResAvailable(tab)
{
		let lastValue = tab[0].val.length-1;    
    let check = [];
    let value = 0;
    
    const nbCol = tab.length-1;
    
    for(let i=1; i<nbCol; i++)
    {
    		if(tab[i].val[lastValue] <= 0)
        {
        		check[i-1] = 0;
        }
    }
    
    for(let i=0; i<check.length; i++)
    {
    		value = value + check[i];
    }
    
    //console.log("Value = " + value);
    if(value != 0)
    {
    		console.log("Le tableau n'est pas encore dans son état définitif.");
        return false;
    }
    else
    {
    		console.log("Le tableau est fini")
    		return true;
    }
}
let tabStart = [
  {name:"x",val:[3,1,0,30]},
  {name:"y",val:[2,0,1,50]},
  {name:"e1",val:[1,0,0,0]},
  {name:"e2",val:[0,1,0,0]},
  {name:"e3",val:[0,0,1,0]},
  {name:" - ",val:[1800,400,600,0]},
];
let tabEnd = [
  {name:"x",val:[1,0,0,0]},
  {name:"y",val:[0,0,1,0]},
  {name:"e1",val:[0.33,-0.33,0,-10]},
  {name:"e2",val:[0,1,0,0]},
  {name:"e3",val:[-0.66,0.66,1,-30]},
  {name:" - ",val:[200,200,600,-36000]},
];
//console.log(isResAvailable(tabStart));
//console.log(isResAvailable(tabEnd));

function columnPivot(tab)
{
		let lastValue = tab[0].val.length-1; 
		let max = tab[0].val[lastValue];
    let indexMax = 0;
    
    const nbCol = tab.length-1;
    
		for(let i=1; i<nbCol; i++)
    {
    		if(tab[i].val[lastValue] > max)
        {
        		max = tab[i].val[lastValue];
            indexMax = i;
        }
    }
    
    return indexMax;
}
//console.log(columnPivot(tabStart));

function nextStepPivotLine(tab, indexPivotLine, pivot)
{
		let nbCol = tab.length;
    nbCol = nbCol-1;
    
		for(let i=0; i<nbCol; i++)
    {
    		tab[i].val[indexPivotLine] = tab[i].val[indexPivotLine]/pivot;
    }
}
//console.log(nextStepPivotLine(tabStart,2,1));
//console.log(tabStart);

function determinePivot(tab, indexPivotLine, indexPivotColumn)
{
		let pivot = tab[indexPivotColumn].val[indexPivotLine];
    return pivot;
}
//console.log(determinePivot(tabStart, 2, 1));