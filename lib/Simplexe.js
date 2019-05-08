'use strict'

/**
 * Class used to resolve a linear problem using the simplex algorithm.
 */
class Simplexe {

    /**
     * Initialize the simplex algorithm and build the first set of data
     * @param {Object} data Data received from the client
     * @param {Array<String>} data.x1 Array of x1 values
     * @param {Array<String>} data.x2 Array of x2 values
     * @param {Array<String>} data.val Array of values for the constraints
     * @param {Object} data.obj Object contining the objective function
     */
    constructor(data) {

        /**
         * Number of constraint(s) in the linear problem.
         * @type Number
         */
        this.nbConstraint = data.x1.length;

        /**
         * Array that contains all the columns to resolve a linear problem with the simplex algorithm
         * @type Array<Object>
         * @param {String} tab.name Name of the column
         * @param {Array<String>} tab.val Values of the column
         */
        this.tab = [];

        this.tab.push({
            name: "x1",
            val: data.x1.map(x => {
                return parseFloat(x)
            })
        });
        this.tab[0].val.push(parseFloat(data.obj.x1));

        this.tab.push({
            name: "x2",
            val: data.x2.map(x => {
                return parseFloat(x)
            })
        });
        this.tab[1].val.push(parseFloat(data.obj.x2));

        for (let i = 0; i < this.nbConstraint; i++) {
            let tab = new Array(this.nbConstraint + 1);
            tab.fill(0);
            tab[i] = 1;
            this.tab.push({
                name: `e${i+1}`,
                val: tab
            });
        }

        this.tab.push({
            name: "_",
            val: data.val.map(x => {
                return parseFloat(x)
            })
        });
        this.tab[2 + this.nbConstraint].val.push(0);

        /**
         * Array containing all the variable in base.
         * @type Array<String>
         */
        this.inBase = [];
        for (let i = 1; i <= this.nbConstraint; i++) {
            this.inBase.push(`e${i}`);
        }
    }

    /**
     * Move the simplexe from one state to the next one, using the pivot.
     */
    changeState() {
        let pivotColumn = this.tab[this.columnPivot()];
        let pivotColumnVal = [...pivotColumn.val]; // Copy the array of value since the array changes during the process and we need the values pre-process
        let pivotLine = 2;
        let pivot = pivotColumnVal[pivotLine];

        for (let i = 0; i <= this.nbConstraint; i++) {
            if (i === pivotLine) {
                this.nextStepPivotLine(pivotLine, pivot);
            } else {
                for (let column of this.tab) {
                    column.val[i] -= (pivotColumnVal[i] / pivot) * column.val[pivotLine];
                }
            }
        }
    }

    /**
     * Check if another step is usefull to have the result.
     */
    isResAvailable() {
        let lastValue = this.tab[0].val.length - 1;
        let check = [];
        let value = 0;

        const nbCol = this.tab.length - 1;

        for (let i = 1; i < nbCol; i++) {
            if (this.tab[i].val[lastValue] <= 0) {
                check[i - 1] = 0;
            }
        }

        // for each value in the last line of the tab, check if all the number are equals or under zero
        for (let i = 0; i < check.length; i++) {
            value = value + check[i];
        }
        
        if (value !== 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * return the pivot column
     */
    columnPivot() {
        let lastValue = this.tab[0].val.length - 1;
        let max = this.tab[0].val[lastValue];
        let indexMax = 0;

        const nbCol = this.tab.length - 1;

        for (let i = 1; i < nbCol; i++) {
            if (this.tab[i].val[lastValue] > max) {
                max = this.tab[i].val[lastValue];
                indexMax = i;
            }
        }

        return indexMax;
    }

    /**
     * Divides the pivot line by the pivot itself
     * @param {*} indexPivotLine index of the pivot line
     * @param {*} pivot value of the pivot
     */
    nextStepPivotLine(indexPivotLine, pivot) {
        let nbCol = this.tab.length - 1;

        // on the pivot line, each value must be divided by the pivot
        for (let i = 0; i < nbCol; i++) {
            this.tab[i].val[indexPivotLine] = this.tab[i].val[indexPivotLine] / pivot;
        }
    }

    /**
     * return the line pivot
     * @param {*} tab 
     * @param {*} indexPivotColumn index of the pivot column
     */
    linePivot(tab, indexPivotColumn)
    {
        let values = [];
        let nbLine = tab.length-3;
        for(let i=0; i<nbLine; i++)
        {
            // it's not possible to divide by zero
            if(tab[indexPivotColumn].val[i] != 0)
            {
                values[i] = tab[tab.length-1].val[i]/ tab[indexPivotColumn].val[i];
            }
            // after, we need to get the smallest value, if we can't caculated it, it becomes the highest one
            else
            {
                values[i] = 999999999;
            }
        }

        let min = values[0];
        let minIndex = 0;

        // among all the calculated values, return the index of the littlest value
        for(let i=1; i<values.length; i++)
        {
            if(values[i]<min)
            {
                min = values[i];
                minIndex = i;
            }
    }

    return minIndex;
    }


    /**
     * Final implementation of the simplex method.
     */
    simplexMethod()
    {
        // AJOUTER LE CAS IMPOSSIBLE A RESOUDRE DANS LA CONDITION
        while(!isResAvailable)
        {
            this.changeState();
        }
    }
}

module.exports = Simplexe;