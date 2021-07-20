export function generateUniqueId() {
  const uniqueId = Math.random().toString(36) + Math.random().toString(20);
  return uniqueId.substr(2, 25).replace('.', '');
}
