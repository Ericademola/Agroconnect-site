export const generatePaymentSchedule = (
  startDate: string,
  rePaymentType: string,
  numberOfPayments: number,
  paymentPerInstallment: number,
  amountPaid: number,
) => {
  const start = new Date(startDate);
  const schedule = [];

  for (let i = 0; i < numberOfPayments; i++) {
    const paymentDate = new Date(start);

    switch (rePaymentType.toLowerCase()) {
      case "daily":
        paymentDate.setDate(start.getDate() + i);
        break;
      case "weekly":
        paymentDate.setDate(start.getDate() + i * 7);
        break;
      case "bi-weekly":
        paymentDate.setDate(start.getDate() + i * 14);
        break;
      case "monthly":
        paymentDate.setMonth(start.getMonth() + i);
        break;
    }

    const formattedDate = paymentDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    // Determine if this payment has been made based on amountPaid
    const paymentsMadeCount = Math.floor(amountPaid / paymentPerInstallment);
    const isPaid = i < paymentsMadeCount;

    schedule.push({
      paymentDate: formattedDate,
      paymentAmount: paymentPerInstallment.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
      }),
      paymentStatus: isPaid ? "paid" : "pending",
    });
  }

  return schedule;
};
