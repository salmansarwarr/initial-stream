import React from "react";
import { CurrencyRates, NetflixData } from "../Interfaces/interfaces";
import { getCurrencyNames, getCurrenyData, getNetflixData } from "../api";
import SummaryTable from "../components/SummaryTable";
import HeroSection from "../components/Hero";
import CurrencyNetflixPopup from "../components/CurrencyNetflixPopup";

const page = async () => {
    const currencyData: any = await getCurrenyData();
    const netflixData: NetflixData[] = await getNetflixData();
    const currencyRates: CurrencyRates = currencyData.rates;
    const currencies: string[] = Object.keys(currencyData.rates);
    const currrNames: any = getCurrencyNames();

    return (
        <>
            <CurrencyNetflixPopup
                currencies={currencies}
                currencyData={currrNames}
            />
            <HeroSection page="Netflix" />
            <SummaryTable
                currencyRates={currencyRates}
                netflixData={netflixData}
            />
        </>
    );
};

export default page;
