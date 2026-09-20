import { API_URL } from "../config";
import axios from "axios";

// import { resetToken } from ".";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;
// A request that fails without a response (CORS block, network drop, or a very
// slow cold start) would otherwise hang forever. Time it out so it rejects.
axios.defaults.timeout = 60000; // 60s

// Safely extract an error to reject with. On a responseless failure `err.response`
// is undefined, so reading `err.response.data` throws *inside* the catch — which
// leaves the outer promise unsettled (infinite spinner). Always reject cleanly.
function toError(err) {
  return err?.response?.data || err?.message || "Request failed";
}

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
        reject(toError(err));
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
        reject(toError(err));
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
      .catch((err) => {
        reject(toError(err));
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
        reject(toError(err));
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
        reject(toError(err));
      });
  });
}
