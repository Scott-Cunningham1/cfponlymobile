const registerNewUser = async (formData, url, stateUpdater) => {
    const fetchConfig = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json",
        },
    }
    const response = await fetch(url, fetchConfig)
    if (!response.ok) {
        const error = await response.json()
        stateUpdater(error.detail)
    }
    return response.status;
}

export default registerNewUser
