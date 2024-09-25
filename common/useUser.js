import useSWR from "swr";
import { Text } from 'react-native';

const fetcher = async (...args) => {
    const fetchConfig = {
        credentials: "include"
    }
    const response = await fetch(...args, fetchConfig);
    if (response.ok) {
        const data = await response.json();
        if (data) {
            return data;
        }
    } else {
        console.log("error");
    }
}

const useUser = () => {
    const { data, error, isLoading } = useSWR(`http://localhost:8000/token`, fetcher);
    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (error) {
        return { user: null, isError: true, isLoading: false };
    }
    return {
        user: data ? data : null,
        isError: error,
        isLoading: isLoading
    };
}

const getId = async () => {
    const userInfo = useUser();
    const userId = userInfo.user ? userInfo.user.id : null;
    return userId;
}

export { useUser, getId };
