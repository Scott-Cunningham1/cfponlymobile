const getWeek = async (date) => {
    // Array of week start dates in ascending order
    const weekDates = [
        new Date('2024-09-23T03:24:02.441Z'),
        new Date('2024-09-30T03:24:02.441Z'),
        new Date('2024-10-07T03:24:02.441Z'),
        new Date('2024-10-14T03:24:02.441Z'),
        new Date('2024-10-21T03:24:02.441Z'),
        new Date('2024-10-28T03:24:02.441Z'),
        new Date('2024-11-04T03:24:02.441Z'),
        new Date('2024-11-11T03:24:02.441Z'),
        new Date('2024-11-18T03:24:02.441Z'),
        new Date('2024-11-25T03:24:02.441Z'),
        new Date('2024-12-02T03:24:02.441Z'),
        new Date('2024-12-09T03:24:02.441Z')
    ];
    console.log("input date:", date)
    const theDate = new Date(date)
    console.log("the date:", theDate)

    // Loop through the week dates to find the corresponding week number
    for (const gameDate in weekDates) {
        if (gameDate > theDate) {
            return 4; // Week numbers start from 4
        }
    }

    // If the date is after the last week date
    return 15; // Return 15 if the date is after the last week
};

export default getWeek;
