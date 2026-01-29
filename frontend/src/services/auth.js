const API_URL = "http://localhost:3000";

export let login = async function(username, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to login.");
    }

    return res.json(); // token
}

export let signup = async function(name, surname, username, password) {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, surname, username, password})
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to signup.");
    }

    return res.json();
}


