const moment = require.requireActual('moment');
//to import the actual moment

export default (timestamp = 0) => {
    return moment(timestamp);
};