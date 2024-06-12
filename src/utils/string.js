const moment = require("moment");

export const formatDataTime = (str) => {
    const isoString = str;
    const formattedDate = moment(isoString).utc().format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
};
