const getWeek = async (date) => {
    const week4 = new Date('2024-09-24T03:24:02.441Z');
    const week4 = new Date('2024-09-24T03:24:02.441Z')
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