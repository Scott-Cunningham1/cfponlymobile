const getWeek = async (date) => {
    const week4 = new Date('2024-09-23T03:24:02.441Z');
    const week5 = new Date('2024-09-30T03:24:02.441Z');
    const week6 = new Date('2024-10-07T03:24:02.441Z');
    const week7 = new Date('2024-10-14T03:24:02.441Z');
    const week8 = new Date('2024-10-21T03:24:02.441Z');
    const week9 = new Date('2024-10-29T03:24:02.441Z');
    const week10 = new Date('2024-09-24T03:24:02.441Z');
    const week11 = new Date('2024-09-24T03:24:02.441Z');
    const week12 = new Date('2024-09-24T03:24:02.441Z');
    const week13 = new Date('2024-09-24T03:24:02.441Z');
    const week14 = new Date('2024-09-24T03:24:02.441Z');
    const week15 = new Date('2024-09-24T03:24:02.441Z');
    if(date < week4){
        return 4
    }


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