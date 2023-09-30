(function() {

class CalendarEvent {

    day = 1;
    month = 1;
    year = 2023;
    
    name = '';

    uuid = '';

    constructor(day, month, name) {
        this.day = day;
        this.month = month;
        this.name = name;
    }

    toString() {
        this.dateStart = `${this.year.toString()}`
            + `${this.month.toString().padStart(2, '0')}`
            + `${this.day.toString().padStart(2, '0')}`;

        this.dateEnd = this.getUntilDate();

        const eventArray = [
            'BEGIN:VEVENT',
            `DTSTART;VALUE=DATE:${this.dateStart}`,
            `DTEND;VALUE=DATE:${this.dateEnd}`,
            'RRULE:FREQ=YEARLY',
            `UID:${this.getUUID()}`,
            'DTSTAMP:20230930T120000Z',
            'CREATED:20230930T120000Z',
            'LAST-MODIFIED:20230930T120000Z',
            'SEQUENCE:0',
            'STATUS:CONFIRMED',
            `SUMMARY:${this.name}`,
            'TRANSP:TRANSPARENT',
            'END:VEVENT'
        ];

        return eventArray.join('\n');
    }

    getUUID() {
        this.uuid ="10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );

        return this.uuid;
    }

    getUntilDate() {
        let until = '';
        const daysInMonth = new Date(this.year, this.month, 0).getDate();
        if (this.day === daysInMonth) {
            if (this.month === 12) {
                until = `${(this.year + 1)}0101`;
            } else {
                until = `${this.year}`
                    + `${(this.month + 1).toString().padStart(2, '0')}`
                    + '01';
            }
        } else {
            until = `${this.year}`
                + `${this.month.toString().padStart(2, '0')}`
                + `${(this.day + 1).toString().padStart(2, '0')}`
        }

        return until;
    }

};

const generateEvents = () => {
    let events = [];

    // Loop through all months
    data.map(monthObject => {
        const { monthNumber, daysArray } = monthObject;

        // Loop through days of month
        daysArray.map(dayObject => {
            const { dayNumber, names } = dayObject;

            // Loop through names;
            names.map(name => {
                events.push(
                    new CalendarEvent(dayNumber, monthNumber, name)
                );
            });

        });
    });

    return events;
};

// ---------------------------------------------------------------------

const run = () => {
    console.clear();
    const CALENDAR_NAME = 'Meniny';

    const events = generateEvents();
    const EVENTS_LIST = events.map(e => e.toString()).join('\n');
    console.log( events.length );

    const VCALENDAR = [
        'BEGIN:VCALENDAR',
        'PRODID:-//Google Inc//Google Calendar 70.9054//EN',
        'VERSION:2.0',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:'+ CALENDAR_NAME,
        'X-WR-TIMEZONE:Europe/Prague',
        EVENTS_LIST,
        'END:VCALENDAR'
    ];

    return VCALENDAR.join('\n');
};

console.log( run() );

})();
