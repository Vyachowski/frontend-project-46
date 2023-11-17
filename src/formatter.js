export default function formatDiff(originalObj, modifiedObj, difference, flag) {
  console.log(flag);
  return JSON.stringify(difference, null, 2);
}
