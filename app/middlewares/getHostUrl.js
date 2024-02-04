export const getHostUrl = () => {
  let url;
  if (typeof window !== "undefined") {
    url = window.location.hostname;
    return url;
  }
};
