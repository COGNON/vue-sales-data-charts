import type { ChartData, OrderInfo, SalesData } from './types';

export const numToMonth = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December'
};

export function numToMillions(num: number) {
  return Intl.NumberFormat('en', { notation: 'compact' }).format(num);
}

export function getSalesChartData(data: SalesData[], year: number, month: number): ChartData {
  const dataByMonth: number[] = new Array(12).fill(0);

  const productDataByMonth: { [key: string]: number[] } = {};

  let ytd = 0;
  let unitsSold = 0;

  const yearByProduct: { [key: string]: number } = {};
  const yearByProductUnit: { [key: string]: number } = {};

  data.forEach((row) => {
    if (row.YEAR_ID != year) return;

    const monthId = row.MONTH_ID - 1;

    dataByMonth[row.MONTH_ID - 1] += row.SALES;

    if (!productDataByMonth[row.PRODUCTLINE]) {
      productDataByMonth[row.PRODUCTLINE] = new Array(12).fill(0);
    }

    productDataByMonth[row.PRODUCTLINE][monthId] += row.SALES;

    if (month != 0 && row.MONTH_ID != month) return;

    ytd += row.SALES;
    unitsSold += row.QUANTITYORDERED;

    if (!yearByProduct[row.PRODUCTLINE]) yearByProduct[row.PRODUCTLINE] = 0;
    yearByProduct[row.PRODUCTLINE] += row.SALES;

    if (!yearByProductUnit[row.PRODUCTLINE]) yearByProductUnit[row.PRODUCTLINE] = 0;
    yearByProductUnit[row.PRODUCTLINE] += row.QUANTITYORDERED;
  });

  let ytdTotal = 0;

  const yearByProductFinal = Object.entries(yearByProduct).map(([prod, sum]) => {
    const target = sum + sum * Math.random();
    ytdTotal += target;
    return { prod: prod, sum: sum, target: target };
  });

  return {
    salesByMonth: dataByMonth,
    ytd: ytd,
    yearByProduct: yearByProductFinal,
    ytdTarget: ytdTotal,
    yearByProductUnit: Object.entries(yearByProductUnit).map(([prod, sum]) => {
      const target = sum + sum * Math.random();
      return { prod: prod, sum: sum, target: target };
    }),
    unitsSold: unitsSold,
    productSalesByMonth: productDataByMonth
  };
}
