export const getCookies = () => {
    const cookies = document.cookie.split('; ');
    const cookieObj = {};

    for (let i = 0; i < cookies.length; i++) {
        const [name, value] = cookies[i].split('=');
        if (["username", "email", "userIdentifier", "serviceProvider"].includes(name)) {
            cookieObj[name] = value;
        }
    }
    return cookieObj;

};

export const createCookie = (value, serviceProvider, userinfo) => {
    let expires = '';

    const date = new Date();
    date.setTime(date.getTime() + (30 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;

    document.cookie = `userIdentifier=${value}${expires}; path=/`;
    document.cookie = `serviceProvider=${serviceProvider}${expires}; path=/`

    if (userinfo) {
        document.cookie = `username=${userinfo.username}${expires}; path=/`
        document.cookie = `email=${userinfo.email}${expires}; path=/`
    }

};

export const destroyCookie = () => {
    document.cookie = "userIdentifier=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "serviceProvider=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
