export const MONTH_OPTIONS = [
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
];

export function getCurrentPeriod() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

export function getPeriodParts(period) {
  const [year, month] = period.split("-");

  return { year, month };
}

export function getYearOptions(selectedYear) {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, index) =>
    String(currentYear - 1 + index),
  );

  return yearOptions.includes(selectedYear)
    ? yearOptions
    : [selectedYear, ...yearOptions];
}
