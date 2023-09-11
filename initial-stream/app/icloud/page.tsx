import React from "react";
import {
    CurrencyRates,
    NetflixData,
    iCloudData,
} from "../Interfaces/interfaces";
import { getCurrencyNames, getCurrenyData, getICloudData } from "../api";
import HeroSection from "../components/Hero";
import SummaryTableICloud from "../components/SummaryTableICloud";
import CurrencyNetflixPopup from "../components/CurrencyNetflixPopup";

const page = async () => {
    const currencyData: any = await getCurrenyData();
    const iCloudData: iCloudData[] = await getICloudData();
    const currencyRates: CurrencyRates = currencyData.rates;
    const currencies: string[] = Object.keys(currencyData.rates);
    const currrNames: any = getCurrencyNames();

    return (
        <>
            <CurrencyNetflixPopup
                currencies={currencies}
                currencyData={currrNames}
            />
            <HeroSection page="iCloud" />
            <SummaryTableICloud
                currencyRates={currencyRates}
                iCloudData={iCloudData}
            />
        </>
    );
};

export default page;
