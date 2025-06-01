const express = require( "express");
const { google } = require( "googleapis");
const app = express();
app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets",
    }) ;
    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1Mm_xxrdwJq-dEHoFBSdrRzBV2BU7BKHCWpmZmhbmxIE";

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    });

    res.send(getRows.data);
}) ;
app.listen(1337, (req, res) => console.log("running on 1337"));