import { useState, useEffect } from "react";

export default function useLocalStorage(initialState:unknown, key:string) {
    const [value, setValue] = useState(function() {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) :initialState
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}