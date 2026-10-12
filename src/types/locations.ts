export interface CityInfo {
  name: string;
  slug: string;
  registrationTaxRate: number; // percentage of base price
  roadTaxFixed: number; // fixed local road tax in local currency
  insuranceRate: number; // percentage
  evIncentive: number; // positive rebate / discount for EVs in local currency
  greenCess: number; // emissions fee on petrol/diesel
  currencySymbol: string;
  currencyCode: string;
  usdExchangeRate: number; // 1 USD = X local currency
  hubDealersCount: number;
}

export interface StateInfo {
  name: string;
  code: string;
  cities: CityInfo[];
}

export interface CountryInfo {
  name: string;
  code: string;
  region: 'North America' | 'Europe' | 'Asia' | 'Middle East' | 'Oceania';
  currencyCode: string;
  currencySymbol: string;
  usdExchangeRate: number;
  states: StateInfo[];
}

export const GLOBAL_LOCATIONS: CountryInfo[] = [
  {
    name: 'United States',
    code: 'US',
    region: 'North America',
    currencyCode: 'USD',
    currencySymbol: '$',
    usdExchangeRate: 1.0,
    states: [
      {
        name: 'California',
        code: 'CA',
        cities: [
          {
            name: 'Los Angeles',
            slug: 'los-angeles',
            registrationTaxRate: 0.095,
            roadTaxFixed: 380,
            insuranceRate: 0.038,
            evIncentive: 2000,
            greenCess: 150,
            currencySymbol: '$',
            currencyCode: 'USD',
            usdExchangeRate: 1.0,
            hubDealersCount: 68
          },
          {
            name: 'San Francisco',
            slug: 'san-francisco',
            registrationTaxRate: 0.0863,
            roadTaxFixed: 360,
            insuranceRate: 0.036,
            evIncentive: 2000,
            greenCess: 150,
            currencySymbol: '$',
            currencyCode: 'USD',
            usdExchangeRate: 1.0,
            hubDealersCount: 42
          }
        ]
      },
      {
        name: 'New York',
        code: 'NY',
        cities: [
          {
            name: 'New York City',
            slug: 'new-york-city',
            registrationTaxRate: 0.0888,
            roadTaxFixed: 320,
            insuranceRate: 0.046,
            evIncentive: 2000,
            greenCess: 200,
            currencySymbol: '$',
            currencyCode: 'USD',
            usdExchangeRate: 1.0,
            hubDealersCount: 54
          }
        ]
      },
      {
        name: 'Texas',
        code: 'TX',
        cities: [
          {
            name: 'Austin',
            slug: 'austin',
            registrationTaxRate: 0.0625,
            roadTaxFixed: 220,
            insuranceRate: 0.034,
            evIncentive: 2500,
            greenCess: 50,
            currencySymbol: '$',
            currencyCode: 'USD',
            usdExchangeRate: 1.0,
            hubDealersCount: 38
          },
          {
            name: 'Dallas',
            slug: 'dallas',
            registrationTaxRate: 0.0625,
            roadTaxFixed: 220,
            insuranceRate: 0.035,
            evIncentive: 2500,
            greenCess: 50,
            currencySymbol: '$',
            currencyCode: 'USD',
            usdExchangeRate: 1.0,
            hubDealersCount: 49
          }
        ]
      }
    ]
  },
  {
    name: 'Germany',
    code: 'DE',
    region: 'Europe',
    currencyCode: 'EUR',
    currencySymbol: '€',
    usdExchangeRate: 0.92,
    states: [
      {
        name: 'Bavaria (Bayern)',
        code: 'BY',
        cities: [
          {
            name: 'Munich (München)',
            slug: 'munich',
            registrationTaxRate: 0.19, // 19% MwSt included
            roadTaxFixed: 280,
            insuranceRate: 0.031,
            evIncentive: 3000,
            greenCess: 180,
            currencySymbol: '€',
            currencyCode: 'EUR',
            usdExchangeRate: 0.92,
            hubDealersCount: 52
          },
          {
            name: 'Nuremberg (Nürnberg)',
            slug: 'nuremberg',
            registrationTaxRate: 0.19,
            roadTaxFixed: 260,
            insuranceRate: 0.03,
            evIncentive: 3000,
            greenCess: 180,
            currencySymbol: '€',
            currencyCode: 'EUR',
            usdExchangeRate: 0.92,
            hubDealersCount: 26
          }
        ]
      },
      {
        name: 'Baden-Württemberg',
        code: 'BW',
        cities: [
          {
            name: 'Stuttgart',
            slug: 'stuttgart',
            registrationTaxRate: 0.19,
            roadTaxFixed: 275,
            insuranceRate: 0.032,
            evIncentive: 3000,
            greenCess: 190,
            currencySymbol: '€',
            currencyCode: 'EUR',
            usdExchangeRate: 0.92,
            hubDealersCount: 48
          }
        ]
      },
      {
        name: 'Berlin',
        code: 'BE',
        cities: [
          {
            name: 'Berlin City',
            slug: 'berlin',
            registrationTaxRate: 0.19,
            roadTaxFixed: 290,
            insuranceRate: 0.035,
            evIncentive: 3000,
            greenCess: 220,
            currencySymbol: '€',
            currencyCode: 'EUR',
            usdExchangeRate: 0.92,
            hubDealersCount: 44
          }
        ]
      }
    ]
  },
  {
    name: 'India',
    code: 'IN',
    region: 'Asia',
    currencyCode: 'INR',
    currencySymbol: '₹',
    usdExchangeRate: 83.5,
    states: [
      {
        name: 'Maharashtra',
        code: 'MH',
        cities: [
          {
            name: 'Mumbai',
            slug: 'mumbai',
            registrationTaxRate: 0.13, // 13% RTO
            roadTaxFixed: 12000,
            insuranceRate: 0.035,
            evIncentive: 150000,
            greenCess: 8500,
            currencySymbol: '₹',
            currencyCode: 'INR',
            usdExchangeRate: 83.5,
            hubDealersCount: 78
          },
          {
            name: 'Pune',
            slug: 'pune',
            registrationTaxRate: 0.12,
            roadTaxFixed: 10000,
            insuranceRate: 0.033,
            evIncentive: 150000,
            greenCess: 7500,
            currencySymbol: '₹',
            currencyCode: 'INR',
            usdExchangeRate: 83.5,
            hubDealersCount: 45
          }
        ]
      },
      {
        name: 'Delhi NCR',
        code: 'DL',
        cities: [
          {
            name: 'New Delhi',
            slug: 'new-delhi',
            registrationTaxRate: 0.10, // 10% RTO, 0% for EVs!
            roadTaxFixed: 9000,
            insuranceRate: 0.034,
            evIncentive: 200000,
            greenCess: 15000,
            currencySymbol: '₹',
            currencyCode: 'INR',
            usdExchangeRate: 83.5,
            hubDealersCount: 92
          }
        ]
      },
      {
        name: 'Karnataka',
        code: 'KA',
        cities: [
          {
            name: 'Bengaluru (Bangalore)',
            slug: 'bengaluru',
            registrationTaxRate: 0.18, // Karnataka has higher road tax
            roadTaxFixed: 14000,
            insuranceRate: 0.036,
            evIncentive: 100000,
            greenCess: 6000,
            currencySymbol: '₹',
            currencyCode: 'INR',
            usdExchangeRate: 83.5,
            hubDealersCount: 64
          }
        ]
      }
    ]
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    region: 'Europe',
    currencyCode: 'GBP',
    currencySymbol: '£',
    usdExchangeRate: 0.79,
    states: [
      {
        name: 'England',
        code: 'ENG',
        cities: [
          {
            name: 'London',
            slug: 'london',
            registrationTaxRate: 0.20,
            roadTaxFixed: 550, // VED First Year
            insuranceRate: 0.042,
            evIncentive: 1500,
            greenCess: 250, // ULEZ compliance
            currencySymbol: '£',
            currencyCode: 'GBP',
            usdExchangeRate: 0.79,
            hubDealersCount: 62
          },
          {
            name: 'Manchester',
            slug: 'manchester',
            registrationTaxRate: 0.20,
            roadTaxFixed: 500,
            insuranceRate: 0.038,
            evIncentive: 1500,
            greenCess: 150,
            currencySymbol: '£',
            currencyCode: 'GBP',
            usdExchangeRate: 0.79,
            hubDealersCount: 34
          }
        ]
      }
    ]
  },
  {
    name: 'Japan',
    code: 'JP',
    region: 'Asia',
    currencyCode: 'JPY',
    currencySymbol: '¥',
    usdExchangeRate: 152.0,
    states: [
      {
        name: 'Kanto',
        code: 'KT',
        cities: [
          {
            name: 'Tokyo',
            slug: 'tokyo',
            registrationTaxRate: 0.03, // Environmental performance levy
            roadTaxFixed: 39500, // Annual automobile tax
            insuranceRate: 0.028,
            evIncentive: 450000, // CEV clean energy subsidy
            greenCess: 12000,
            currencySymbol: '¥',
            currencyCode: 'JPY',
            usdExchangeRate: 152.0,
            hubDealersCount: 88
          }
        ]
      },
      {
        name: 'Chubu',
        code: 'CB',
        cities: [
          {
            name: 'Nagoya (Aichi)',
            slug: 'nagoya',
            registrationTaxRate: 0.03,
            roadTaxFixed: 39500,
            insuranceRate: 0.026,
            evIncentive: 450000,
            greenCess: 10000,
            currencySymbol: '¥',
            currencyCode: 'JPY',
            usdExchangeRate: 152.0,
            hubDealersCount: 72
          }
        ]
      }
    ]
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    region: 'Middle East',
    currencyCode: 'AED',
    currencySymbol: 'AED ',
    usdExchangeRate: 3.67,
    states: [
      {
        name: 'Emirate of Dubai',
        code: 'DXB',
        cities: [
          {
            name: 'Dubai',
            slug: 'dubai',
            registrationTaxRate: 0.05, // 5% VAT
            roadTaxFixed: 850, // RTA test & registration
            insuranceRate: 0.025,
            evIncentive: 2500, // Free Salik tag & parking
            greenCess: 0,
            currencySymbol: 'AED ',
            currencyCode: 'AED',
            usdExchangeRate: 3.67,
            hubDealersCount: 76
          }
        ]
      },
      {
        name: 'Emirate of Abu Dhabi',
        code: 'AUH',
        cities: [
          {
            name: 'Abu Dhabi',
            slug: 'abu-dhabi',
            registrationTaxRate: 0.05,
            roadTaxFixed: 800,
            insuranceRate: 0.024,
            evIncentive: 2500,
            greenCess: 0,
            currencySymbol: 'AED ',
            currencyCode: 'AED',
            usdExchangeRate: 3.67,
            hubDealersCount: 46
          }
        ]
      }
    ]
  },
  {
    name: 'Italy',
    code: 'IT',
    region: 'Europe',
    currencyCode: 'EUR',
    currencySymbol: '€',
    usdExchangeRate: 0.92,
    states: [
      {
        name: 'Emilia-Romagna',
        code: 'ER',
        cities: [
          {
            name: 'Bologna / Modena',
            slug: 'bologna',
            registrationTaxRate: 0.22,
            roadTaxFixed: 420, // Bollo auto
            insuranceRate: 0.038,
            evIncentive: 3000,
            greenCess: 250,
            currencySymbol: '€',
            currencyCode: 'EUR',
            usdExchangeRate: 0.92,
            hubDealersCount: 38
          }
        ]
      },
      {
        name: 'Lombardy (Lombardia)',
        code: 'LM',
        cities: [
          {
            name: 'Milan (Milano)',
            slug: 'milan',
            registrationTaxRate: 0.22,
            roadTaxFixed: 450,
            insuranceRate: 0.042,
            evIncentive: 3000,
            greenCess: 300,
            currencySymbol: '€',
            currencyCode: 'EUR',
            usdExchangeRate: 0.92,
            hubDealersCount: 56
          }
        ]
      }
    ]
  }
];
