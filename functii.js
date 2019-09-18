export const emailValid = (email) => email.indexOf("@") ? false : true;
export const parolaValida = (parola) => parola.length > 8 ? true : false;