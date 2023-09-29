export default function shallowMergeArrayOfObjects<T>(arr: T[], fieldName: keyof T): T[] {
  const mergedMap: Map<string, T> = new Map();

  for (const obj of arr) {
    const fieldValue = String(obj[fieldName]);
    const existingObj = mergedMap.get(fieldValue);

    if (existingObj) {
      // Shallow merge the objects with the same field value
      mergedMap.set(fieldValue, { ...existingObj, ...obj });
    } else {
      // If no object with the same field value exists, add the current object
      mergedMap.set(fieldValue, obj);
    }
  }

  // Convert the Map back to an array of objects
  return Array.from(mergedMap.values());
}
