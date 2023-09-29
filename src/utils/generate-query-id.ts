import md5 from "md5";

export default function generateQueryId<T = unknown>(obj: T) {
  try {
    const json = JSON.stringify(obj);
    return md5(json);
  } catch (err) {
    return "";
  }
}
