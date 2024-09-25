    const getUser = async (token, username) => {
    try {
        const fetchConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
console.log(username)
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


export default getUser
