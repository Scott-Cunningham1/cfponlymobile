    const fetchStoredToken = async () => {
            try {
                const data = await AsyncStorage.getItem('token');
                if (token !== null) {
                    return data;
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };
