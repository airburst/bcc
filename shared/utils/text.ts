export const formatUserName = (name: string | null): string => {
  if (!name) {
    return "";
  }

  return name.replace(".", " ").replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
