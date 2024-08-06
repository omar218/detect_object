export const API_HOST = process.env.REACT_APP_API_HOST ? process.env.REACT_APP_API_HOST : "127.0.0.1";
export const API_PORT = process.env.REACT_APP_API_PORT ? process.env.REACT_APP_API_PORT : "8000";
export const API_SECURE = process.env.REACT_APP_API_NOT_SECURE && process.env.REACT_APP_API_NOT_SECURE === "false";
