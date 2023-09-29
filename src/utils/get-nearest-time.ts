export default function getNearestTime(date: [Date, Date][]) {
  const nearestDate = date.reduce((prev, curr) => {
    const prevDiff = prev[0].getTime() - new Date().getTime();
    const currDiff = curr[0].getTime() - new Date().getTime();
    return prevDiff > currDiff ? curr : prev;
  });

  return nearestDate;
}
