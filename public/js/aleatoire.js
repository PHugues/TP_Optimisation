module.exports = {

    /**
     * Create constraint and a maximize function with random numbers
     * Number of constraint : 0-5;
     * Number of x and y : 0-100;
     *    '--> for the maximize function and the constraint
     */
    generateAleaMethode: function () {
        let nbConstraint = this.getRandomInt(5);
        nbConstraint = nbConstraint < 2 ? 2 : nbConstraint;

        // maximize function variables
        let x1Val;
        let x2Val;

        // constraints
        let xValues = [];
        let yValues = [];
        let resValues = [];


        // for each constraint, generation of the x and y values
        for (let i = 0; i < nbConstraint; i++) {
            xValues[i] = this.getRandomInt(100) + "";
            yValues[i] = this.getRandomInt(100) + "";
            resValues[i] = this.getRandomInt(100) + "";
        }

        x1Val = this.getRandomInt(100) + "";
        x2Val = this.getRandomInt(100) + "";


        // creation of the data object
        let data = {
            x1: xValues,
            x2: yValues,
            val: resValues,
            obj: {
                x1: x1Val + "",
                x2: x2Val + "",
            }
        };

        return data;
    },

    /**
     * generation of an integer between 0 and max
     * @param {} max 
     */
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max + 1));
    }
}