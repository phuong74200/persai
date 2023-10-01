import dayjs, { extend } from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

extend(duration);
extend(relativeTime);

export default dayjs;
