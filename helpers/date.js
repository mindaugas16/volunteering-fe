exports.dateToString = date => new Date(date).toISOString();

exports.toDate = date => new Date(date);

exports.compareDates = (a, b) => {
    a = a.setHours(0, 0, 0, 0);
    b = b.setHours(0, 0, 0, 0);

    if (a > b) return 1;
    else if (a < b) return -1;
    else return 0;
};
