const usernameValidation = username => {
    if (username.trim() === '') {
        return `Username is required`;
    }
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
        return 'Invalid characters. Only latin letters, numbers and underscore are accepted';
    }
    if (username.trim().length < 4) {
        return `At least four characters`;
    }
    if (username.trim().length >= 20) {
        return 'Max characters'
    }
    return null;
};

const loginUsernameValidation = username => {
    if (username.trim() === '') {
        return `Username cannot be empty`;
    }
    if (!/^[a-zA-Z0-9_]*$/.test(username)) {
        return 'Invalid characters. Only latin letters, numbers and underscore are accepted';
    }
    if (username.trim().length < 4) {
        return `Your username consists of least four characters`;
    }
    if (username.trim().length >= 20) {
        return 'Max characters'
    }
    return null;
};

const firstnameValidation = firstname => {
    if (firstname.trim() === '') {
        return `Firstname is required`;
    }
    if (!/^[a-zA-Z]*$/.test(firstname)) {
        return 'Invalid characters. Only latin letters are accepted';
    }
    if (firstname.trim().length < 3) {
        return `At least three characters`;
    }
    if (firstname.trim().length === 25) {
        return 'Max characters'
    }
    return null;
};

const lastnameValidation = lastname => {
    if (lastname.trim() === '') {
        return null;
    }
    if (!/^[a-zA-Z -]*$/.test(lastname)) {
        return 'Invalid characters. Only latin letters, hyphens and spaces are accepted';
    }
    if (lastname.trim().length === 25) {
        return 'Max characters'
    }
    return null;
};

const emailValidation = email => {
    if (email.trim() === '') {
        return 'Email is required';
    }
    if (email.trim().length === 40) {
        return 'Max characters'
    }
    return null;
};

const phoneValidation = phoneNumber => {
    if (phoneNumber.trim() === '') {
        return null;
    }
    if (!/^\d$/.test(phoneNumber)) {
        return 'Only numbers are accepted'
    }
    if (phoneNumber.trim().length < 12) {
        return 'At least 12 numbers'
    }
    return null
}

const passwordValidation = password => {
    if (!password) {
        return 'Password is required'
    }
    if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
        return 'At least 6 symbols, latin letters or numbers'
    }
    return null
}

const confirmPasswordValidation = password => {
    if (!password) {
        return 'Password confirmation is required'
    }
    if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
        return 'At least 6 symbols, latin letters or numbers'
    }
    return null
}

export {
    usernameValidation,
    firstnameValidation,
    passwordValidation,
    loginUsernameValidation,
    emailValidation,
    phoneValidation,
    lastnameValidation,
    confirmPasswordValidation
}