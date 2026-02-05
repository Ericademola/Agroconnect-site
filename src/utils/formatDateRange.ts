export const formatDeliveryDateRange = (
  daysFromNow: number = 3,
  rangeDays: number = 2,
): string => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + daysFromNow);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + daysFromNow + rangeDays);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const startFormatted = startDate.toLocaleDateString("en-US", options);
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();

  // If same month
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startFormatted}–${endDay}, ${year}`;
  } else {
    // If different months
    const endFormatted = endDate.toLocaleDateString("en-US", options);
    return `${startFormatted}–${endFormatted}, ${year}`;
  }
};
