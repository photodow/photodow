type LocalStore = {
    setItem: (key: string, value: string) => void,
    getItem: (key: string) => string | null,
    removeItem: (key: string) => void,
}

export default function localStore (): LocalStore  {
    if (typeof localStorage === 'undefined') {
        return {
            setItem: () => null,
            getItem: () => null,
            removeItem: () => null,
        };
    }

    return localStorage;
}