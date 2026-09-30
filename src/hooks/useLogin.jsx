import { useState } from "react";

const useLogin = (url) => {
    const [error, setError] = useState(null);

    const login = async (user) => {
        setError(null);

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed");
                return null;
            }

            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    return { login, error };
};

export default useLogin;