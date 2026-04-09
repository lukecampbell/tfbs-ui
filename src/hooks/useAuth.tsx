import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const [user, setUser] = useState<{ login: string; roles: string[] } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const res = await fetch("/api/user", { credentials: "include" });
            if (!res.ok) {
                navigate("/");
                return;
            }
            const data = await res.json();
            setUser(data);
            setLoading(false);
        };
        checkAuth();
    }, [navigate]);

    return { user, loading };
}