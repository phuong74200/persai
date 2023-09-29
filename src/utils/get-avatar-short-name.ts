export default function getAvatarShortName(name?: string) {
  if (name) {
    const shortName: string[] = name.match(/(?:\s|^)[a-z]/gi) || [];
    return shortName.join("").slice(-2).toUpperCase();
  }
  return "NaN";
}
