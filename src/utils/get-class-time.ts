import dayjs from "dayjs";

export default function getClassTime(time?: [Date, Date]) {
  if (!time) return "";

  return `${dayjs(time[0]).format("HH:mm")} - ${dayjs(time[1]).format("HH:mm")}, ${dayjs(
    time[0],
  ).format("DD/MM/YYYY")}`;
}

export const getClassHours = (time: [Date, Date]) => {
  return `${dayjs(time[0]).format("HH:mm")} - ${dayjs(time[1]).format("HH:mm")}`;
};

export const formatDays = (times: Date[], format: string) => {
  return times.map((time) => dayjs(time).format(format));
};
