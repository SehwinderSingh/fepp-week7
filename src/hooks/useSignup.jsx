import { useState } from "react";

const useSignup = (url) => {
    const [error, setError] = useState(null);

    const signup = async (user) => {
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
                setError(data.error || "Signup failed");
                return null;
            }

            return data;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    return { signup, error };
};

export default useSignup;