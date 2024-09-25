const getWeek = async (date) => {
    if())

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
