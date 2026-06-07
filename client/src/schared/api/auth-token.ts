export const AUTH_TOKEN_STORAGE_KEY = 'events_auth_token';

export const getAuthToken = (): string | null => {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
}

export const setAuthToken = (token?: string) => {
    if (!token) {
        removeAuthToken();
        return;
    }
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);

}

export const removeAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
}