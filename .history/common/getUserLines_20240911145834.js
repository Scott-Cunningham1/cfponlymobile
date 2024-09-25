

const getUserLines = async (token, user_id, week) => {
  try {
    const fetchConfig = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(`https://cfponly.com/api/games/lines/${user_id}/${week}`, fetchConfig);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        console.error('Failed to fetch teams:', response.statusText);
    }
} catch (error) {
    console.error('Error fetching teams:', error);
};
}
export default getUserLines;
