import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

dayjs.extend(utc)

export function formatUtcString(
  utcString: string,
  formatType: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).utcOffset(8).format(formatType)
}
