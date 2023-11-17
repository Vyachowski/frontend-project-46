export default function formatDiff(originalObj, modifiedObj, difference, flag = 'stylish') {
  return JSON.stringify(difference);
}
