export const getLocalStorageValues = () => {
  // eslint-disable-next-line prefer-const
  let User = localStorage.getItem('User');
  return {
    User: JSON.parse(User) || {},
  };
};
