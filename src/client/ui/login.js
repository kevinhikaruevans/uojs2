const loginForm = document.querySelector('#login');
const display = document.querySelector('#display');
let loginFormVisible = false;
let loginCallback = null;

export const showLoginForm = () => {
    if (loginFormVisible) {
        return;
    }
    loginFormVisible = true;
    loginForm.style.display = 'block';
    display.style.display = 'none';
};
export const hideLoginForm = () => {
    if (!loginFormVisible) {
        return;
    }
    loginFormVisible = false;
    loginForm.style.display = 'none';
    display.style.display = 'block';
};
export const handleLoginClick = () => {
    const username = loginForm.querySelector('input[name="username"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;
    console.log('handleLoginClick -> ', username, password);
    loginCallback(username, password);
};
export const bind = (cb) => {
    loginForm.querySelector('button').addEventListener('click', handleLoginClick);
    loginCallback = cb;
};
