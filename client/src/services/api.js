import axios from "axios";

const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").trim();
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");
const apiBaseUrl = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

if (!rawBaseUrl) {
  // eslint-disable-next-line no-console
  console.error("[api] VITE_API_BASE_URL is missing");
}

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL || ""}${config.url || ""}`;
  // eslint-disable-next-line no-console
  console.log("[api][request]", {
    method: config.method,
    url: fullUrl,
    hasData: Boolean(config.data)
  });
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line no-console
    console.error("[api][error]", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;