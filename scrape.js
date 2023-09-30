(function(public) {

const getMonthNumber = (month) => {
    month = month.normalize('NFD').replace(/[\u0300-\u036f]/g, '').substring(0, 3);
    return 'JanFebMarAprMajJunJulAugSepOktNovDec'.indexOf(month) / 3 + 1;
};

let privateData = [];
let namesCounter = 0;

const container = $('#content-inner');
const headings = $('h3', container);

headings.each(function() {

    // Month object
    const monthObject = {};

    const month = $(this).text();
    monthObject.monthName = month;
    monthObject.monthNumber = getMonthNumber(month);

    // Days array
    monthObject.daysArray = [];

    const table = $(this).next();
    const rows = $('tr', table);
    rows.map(function(rowNum) {
        if (rowNum === 0) { return; }

        // Day object
        const dayObject = {};
        dayObject.names = [];
        
        const row = $(this);
        const cols = $('td', row);
        cols.map(function(colNum) {
    
            const col = $(this);
            const anchors = $('a', col);

            if (colNum === 0) {
                const day = anchors.text().replace('.', '').trim();
                dayObject.dayNumber = parseInt(day);
            } else {
                anchors.map(function() {
                    const anchor = $(this);
                    const name = anchor.text();
                    dayObject.names.push(name);
                    namesCounter++;
                });
            }
                
        });

        monthObject.daysArray.push( dayObject );
    });

    privateData.push( monthObject );
});

if (public) {
    window.data = privateData;
}

})(true);
