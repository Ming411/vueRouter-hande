export default function createRoute(record, path) {
  const matched = [];
  while (record) {
    matched.unshift(record);
    record = record.parentRecord;
  }
  return {
    matched,
    path
  };
}
