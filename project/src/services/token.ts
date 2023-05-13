export const AUTHORIZATION_TOKEN_KEY_NAME = 'wtw-token';
export type TokenType = string;

export const getToken = (): TokenType => {
  const token = localStorage.getItem(AUTHORIZATION_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: TokenType): void => {
  localStorage.setItem(AUTHORIZATION_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTHORIZATION_TOKEN_KEY_NAME);
};
