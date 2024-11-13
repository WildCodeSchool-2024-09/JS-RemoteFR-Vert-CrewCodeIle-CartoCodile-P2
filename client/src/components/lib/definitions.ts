export type Country = {
  id: number;
  countryName: string;
  hint: string;
  flag: string;
  capital: string;
  monumentImage: string;
};

export type Question = {
  id: number;
  country: Country;
  type: {
    image: string | null;
    label: string;
  };
};

export type CountryCardtype = {
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
