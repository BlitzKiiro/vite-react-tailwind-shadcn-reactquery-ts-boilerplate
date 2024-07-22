const api_url = "";

export const fetchAPI = (url: string, options: { [key: string]: any } = {}) => {
  const token = localStorage.getItem("auth-token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const updatedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  return fetch(api_url + url, updatedOptions);
};
