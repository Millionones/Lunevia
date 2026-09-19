import { API_URL } from "../config";
import axios from "axios";

// import { resetToken } from ".";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

// Fire-and-forget on-demand revalidation. Called after a successful admin write
// so the public site reflects CMS changes on the next visit instead of waiting
// out the hourly ISR window (see app/api/revalidate/route.js). Scoped to the
// /admin panel — public writes (contact form, etc.) run on other paths and are
// intentionally skipped, and it never blocks or fails the underlying save.
function triggerRevalidate() {
  if (typeof window === "undefined") return;
  if (!window.location.pathname.startsWith("/admin")) return;
  // Same-origin, no body => the route does a full public-site revalidation.
  fetch("/api/revalidate", { method: "POST", keepalive: true }).catch(() => {});
}

export function get(url, config) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { ...config })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url, data, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { ...config })
      .then((response) => {
        triggerRevalidate();
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function put(url, data, config) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data, { ...config })
      .then((response) => {
        triggerRevalidate();
        resolve(response.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
}
export function del(url) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {})
      .then((response) => {
        triggerRevalidate();
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}

export function delQuery(url, id = "") {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${url} ${id ? "=" + id : ""}`, {})
      .then((response) => {
        triggerRevalidate();
        resolve(response.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  });
}
