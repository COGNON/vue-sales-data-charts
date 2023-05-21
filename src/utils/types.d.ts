import type { ApexOptions } from 'apexcharts';

export type SalesData = {
  ORDERNUMBER: number;
  QUANTITYORDERED: number;
  PRICEEACH: number;
  ORDERLINENUMBER: number;
  SALES: number;
  ORDERDATE: string;
  STATUS: string;
  QTR_ID: number;
  MONTH_ID: number;
  YEAR_ID: number;
  PRODUCTLINE: string;
  MSRP: number;
  PRODUCTCODE: string;
  CUSTOMERNAME: string;
  PHONE: string;
  ADDRESSLINE1: string;
  ADDRESSLINE2: string;
  CITY: string;
  STATE: string;
  POSTALCODE: string;
  COUNTRY: string;
  TERRITORY: string;
  CONTACTLASTNAME: string;
  CONTACTFIRSTNAME: string;
  DEALSIZE: string;
};

export type byProduct = {
  prod: string;
  sum: number;
  target: number;
};

export type ChartData = {
  salesByMonth: number[];
  productSalesByMonth: {
    [key: string]: number[];
  };
  ytd: number;
  ytdTarget: number;
  unitsSold: number;
  yearByProduct: byProduct[];
  yearByProductUnit: byProduct[];
};

export type ChartOpts = {
  options: ApexOptions;
  series: ApexAxisChartSeries;
};
