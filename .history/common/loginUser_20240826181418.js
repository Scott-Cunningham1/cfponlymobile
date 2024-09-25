const loginUser = async (username, password) => {
    let userToken = null;

    try {
        const url = `https://cfponly.com/token`;
        const form = new FormData();
        form.append("username", username);
        form.append("password", password);
        
        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            body: form,
        });

        if (response.ok) {
            const responseData = await response.json();
            userToken = responseData?.access_token ?? null;
        } else {
            console.error('Login failed:', response.status, response.statusText);
            // Handle specific errors if needed
            // For example:
            // throw new Error('Failed to login');
            // or return null;
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        // Propagate the error further or handle as needed
        // throw error; // Uncomment to propagate the error
    }

    return userToken;
};

export default loginUser;
