import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function getGreeting() {
  const hour = dayjs().hour();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
export const dateConverter = (date) => {
  const formats = ["YYYY-MM-DDTHH:mm:ssZ", "YYYY-MM-DD HH:mm:ss", "YYYY-MM-DD"];
  const parsed = dayjs(date, formats, true);
  return parsed.isValid() ? parsed.format("DD-MM-YYYY") : dayjs(date).isValid() ? dayjs(date).format("DD-MM-YYYY") : "";
};

export const timeConverter = (time) => {
  const formats = ["HH:mm:ss", "HH:mm", "YYYY-MM-DD HH:mm:ss"];
  const parsed = dayjs(time, formats, true);
  return parsed.isValid() ? parsed.format("hh:mm A") : "";
};

export const toTop = () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

export const cleanObj = (obj) => {
  Object.keys(obj).map((key) => {
    const val = obj[key];
    if (Array.isArray(val) && val.length === 0) {
      delete obj[key];
      return;
    }
    if (typeof val === "object" && Object.keys(val).length == 0) {
      delete obj[key];
      return;
    }
  });

  return obj;
};

export const setMetaTitleAndDesc = (title, desc, absolute = true) => {
  if (!(title && desc)) return {};

  const obj = {
    title: {},
    description: desc,
    openGraph: {
      title: {},
      description: desc,
    },
  };

  if (absolute) {
    obj.title.absolute = title;
    obj.openGraph.title.absolute = title;
  } else {
    obj.title = title;
    obj.openGraph.title = title;
  }

  return obj;
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateMobile = (mobile) => {
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};