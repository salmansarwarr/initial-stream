import CurrencyNetflixPopup from "./components/CurrencyNetflixPopup";
import { getCurrencyNames, getCurrenyData } from './api';
import LandingPage from "./components/LandingPage";

const page = async () => {
    //API 1
    const currencyData: any = await getCurrenyData();
    const currencies: string[] = Object.keys(currencyData.rates);
    const currrNames: any = getCurrencyNames();

    return (
        <>
            <CurrencyNetflixPopup currencies={currencies} currencyData={currrNames}/>
            <LandingPage/>
        </>
    );
};

export default page;
