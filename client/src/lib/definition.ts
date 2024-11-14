export type CountryCardType = {
  id: number;
  countryName: string;
  flag: string;
  capital: string;
  population: number;
  currency: string;
  weather: {
    description: string;
    temperature: number;
  };
  localTime: string;
  monumentImage: string;
  timezone: string;
  hint: string;
};
