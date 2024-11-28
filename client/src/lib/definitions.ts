export type Country = {
  id: number;
  countryName: string;
  hint: string;
  flag: string;
  capital: string;
  monumentImage: string;
};

export type BadCountries = {
  id: number;
  countryName: string;
};

export type GoodCountryQuestion = {
  id: number;
  country: Country;
  type: {
    image: string | null;
    label: string;
  };
  answers: string[];
  hint: string;
};

export type CountryCardType = {
  id: number;
  countryName: string;
  flag: string;
  capital: string;
  population: string;
  currency: string;
  weather: {
    description: string;
    temperature: string;
  };
  timeShift: string;
  monumentImage: string;
  timezone: string;
  hint: string;
};
export type ClientType = {
  id: number;
  profilepic: string;
  clientName: string;
  clientJob: string;
};
export type FunFactType = {
  id: number;
  countryName: string;
  funFact: string;
};
export type userData = {
  userPseudo: string;
};
