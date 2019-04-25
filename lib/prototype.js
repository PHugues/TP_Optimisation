Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

Object.prototype.isEmpty = function() {
    for(let key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}

String.IsNullOrEmpty = function(str) {
    str = str.trim();
    if((str === null) || (str === '') || (str === undefined)) return true;
    return false;
}