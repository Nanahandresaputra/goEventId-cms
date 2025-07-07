export const getColumnWidth = (dataIndex, dataSource, header) => {
  const maxBodyLength =
    Math.max(...dataSource.map((item) => String(item[dataIndex]).length)) * 10;

  const headerLength = String(header).length * 10;

  const maxLength = Math.max(maxBodyLength, headerLength);

  return maxLength;
};
