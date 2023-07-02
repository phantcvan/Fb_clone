export const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 10000000)
  return randomId;
}