const fetchUsername = async () => {
            try {
                const data = await AsyncStorage.getItem('username');
                if (un !== null) {
                    return data;
                }
            } catch (error) {
                console.error('Error retrieving username:', error);
            }
        };
