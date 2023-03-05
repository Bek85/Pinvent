function truncate(str, limit, suffix = '...') {
  if (str.length <= limit) {
    return str;
  }

  const end = limit - suffix.length;
  const truncatedStr = str.substring(0, end);
  const strWithSuffix = `${truncatedStr}${suffix}`;

  return strWithSuffix.length <= limit
    ? strWithSuffix
    : strWithSuffix.substring(0, limit);
}

export default truncate;
