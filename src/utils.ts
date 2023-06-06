export const firebaseGuid = () => {
    const CHARS =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let autoId = "";

    for (let i = 0; i < 28; i++) {
        autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }

    return autoId;
};

export const generateGameId = () => {
    const CHARS = "abcdefghijklmnopqrstuvwxyz";

    let autoId = "";

    for (let i = 0; i < 6; i++) {
        autoId += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    }

    return autoId;
};

export const delay = (ms: number): Promise<number> =>
    new Promise((res) => {
        return setTimeout(res, ms);
    });

export const changeTheme = (theme?: string, defaultTheme: string = "dark") => {
    const body = document.querySelector("html");
    if (theme) {
        body?.setAttribute("data-theme", theme);
    } else {
        body?.setAttribute("data-theme", defaultTheme);
    }
};

export const getTheme = (defaultTheme: string = "dark") => {
    const body = document.querySelector("html");
    return body?.getAttribute("data-theme") || defaultTheme;
};

export const popRandom = (arr: any[]) => {
    const index = Math.floor(Math.random() * arr.length);
    return arr.splice(index, 1).pop();
};

export const makeString = (arr: string[]) => {
    if (arr.length === 1) return arr[0];
    const firsts = arr.slice(0, arr.length - 1);
    const last = arr[arr.length - 1];
    return firsts.join(", ") + " and " + last;
};