export const printf = (str, ...args) => {
  const replacer = (_, match, id) => {
    const index = Number.parseInt(id);

    return args[index] ? args[index] : match;
  };

  return str.replace(/(\{(\d*)\})/gi, replacer);
};
