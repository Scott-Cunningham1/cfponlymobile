const getWeek = async (date) => {
    const week4 = new Date('2024-09-23T03:24:02.441Z');
    const week5 = new Date('2024-09-30T03:24:02.441Z');
    const week6 = new Date('2024-10-07T03:24:02.441Z');
    const week7 = new Date('2024-10-14T03:24:02.441Z');
    const week8 = new Date('2024-10-21T03:24:02.441Z');
    const week9 = new Date('2024-10-28T03:24:02.441Z');
    const week10 = new Date('2024-11-04T03:24:02.441Z');
    const week11 = new Date('2024-11-11T03:24:02.441Z');
    const week12 = new Date('2024-11-18T03:24:02.441Z');
    const week13 = new Date('2024-11-25T03:24:02.441Z');
    const week14 = new Date('2024-12-02T03:24:02.441Z');
    const week15 = new Date('2024-12-09T03:24:02.441Z');
    if(date < week4){
        return 4
    };
    if(date > week4 && date < week5){
        return 5
    };
    if(date > week5 && date < week6){
        return 6
    };
    if(date > week6 && date < week7){
        return 7
    };
    if(date > week7 && date < week8){
        return 8
    };
    if(date > week8 && date < week9){
        return 9
    };
    if(date > week5 && date < week6){
        return 10
    };
    if(date > week6 && date < week7){
        return 11
    };
    if(date > week7 && date < week8){
        return 12
    };


        const response = await fetch(`https://cfponly.com/api/users/${username}`, fetchConfig);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch user:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};


export default getWeek
