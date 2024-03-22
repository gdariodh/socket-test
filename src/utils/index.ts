export const generateColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

export const generateUUID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
