export const extractTags = description => {
  const tags = {};
  const regex = /(\w+):([^;]+)/g;
  let match;
  while ((match = regex.exec(description)) !== null) {
    tags[match[1].toUpperCase()] = match[2].trim();
  }
  return tags;
};
