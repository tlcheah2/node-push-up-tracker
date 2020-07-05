const { google } = require('googleapis');
const Moment = require('moment');

const formatRow = (row) => ({
    date: row[0],
    pushup: {
        total: parseInt(row[5], 10),
        morning: parseInt(row[1], 10),
        afternoon: parseInt(row[2], 10),
        evening: parseInt(row[3], 10),
        night: parseInt(row[4], 10),
    }
});

/**
 * Perform authentication with google sheet and retrieve spreadsheet data
 * @returns {[Array]} - 2d array
 */
exports.retrieveDataFromSpreadSheets = async () => {
    const auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const api = google.sheets({ version: 'v4', auth });
    const response = await api.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: `${process.env.TAB_ID}!A:F`
    });
    // Col 0 - Date
    // Col 5 - Total Pushup  
    return response.data.values;
}

exports.getPushUpByDate = async (fromDate, toDate) => {
    const results = await this.retrieveDataFromSpreadSheets();
    const formattedFromDate = Moment(fromDate).format('YYYY-MM-DD');
    const formattedToDate = Moment(toDate).format('YYYY-MM-DD');
    console.log('formattedDate', formattedFromDate, formattedToDate);
    // Find out the matching date
    const filteredResults = results.filter((row) =>
        Moment(row[0]).isValid() &&
        Moment(row[0]).isSameOrAfter(formattedFromDate) &&
        Moment(row[0]).isSameOrBefore(formattedToDate));
    const response = filteredResults.map((res) => formatRow(res));
    return response;
};