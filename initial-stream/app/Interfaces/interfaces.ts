export interface CurrencyRates {
    [currencyCode: string]: number;
}

export interface NetflixData {
    country_code: string;
    country_name: string;
    EURto: string;
    EURtoRate: string;
    url: string;
    mobile: string | null;
    basic: string | null;
    standard: string | null;
    premium: string | null;
    standard_ads: string;
    mobileEUR: string | null;
    basicEUR: string | null;
    standardEUR: string | null;
    premiumEUR: string | null;
    standard_adsEUR: string;
}

export interface iCloudData {
    country_name: string;
    EURto: string;
    EURtoRate: string;
    url: string;
    '50GB': string | null;
    '200GB': string | null;
    '2TB': string | null;
    '50GBEUR': string | null;
    '200GBEUR': string | null;
    '2TBEUR': string | null;    
}

