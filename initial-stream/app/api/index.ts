export async function getCurrenyData() {
    const res = await fetch(
        "http://api.exchangeratesapi.io/v1/latest?access_key=52d4fc2d3daeb5bf383f7686d15e6a79",
        {
            method: "get",
        }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export function getCurrencyNames() {
    return {
        AED: "United Arab Emirates Dirham",
        AFN: "Afghan Afghani",
        ALL: "Albanian Lek",
        AMD: "Armenian Dram",
        ANG: "Netherlands Antillean Guilder",
        AOA: "Angolan Kwanza",
        ARS: "Argentine Peso",
        AUD: "Australian Dollar",
        AWG: "Aruban Florin",
        AZN: "Azerbaijani Manat",
        BAM: "Bosnia-Herzegovina Convertible Mark",
        BBD: "Barbadian Dollar",
        BDT: "Bangladeshi Taka",
        BGN: "Bulgarian Lev",
        BHD: "Bahraini Dinar",
        BIF: "Burundian Franc",
        BMD: "Bermudian Dollar",
        BND: "Brunei Dollar",
        BOB: "Bolivian Boliviano",
        BRL: "Brazilian Real",
        BSD: "Bahamian Dollar",
        BTC: "Bitcoin",
        BTN: "Bhutanese Ngultrum",
        BWP: "Botswanan Pula",
        BYN: "Belarusian Ruble",
        BYR: "Belarusian Ruble (Obsolete)",
        BZD: "Belize Dollar",
        CAD: "Canadian Dollar",
        CDF: "Congolese Franc",
        CHF: "Swiss Franc",
        CLF: "Chilean Unit of Account (UF)",
        CLP: "Chilean Peso",
        CNY: "Chinese Yuan",
        COP: "Colombian Peso",
        CRC: "Costa Rican Colón",
        CUC: "Cuban Convertible Peso",
        CUP: "Cuban Peso",
        CVE: "Cape Verdean Escudo",
        CZK: "Czech Republic Koruna",
        DJF: "Djiboutian Franc",
        DKK: "Danish Krone",
        DOP: "Dominican Peso",
        DZD: "Algerian Dinar",
        EGP: "Egyptian Pound",
        ERN: "Eritrean Nakfa",
        ETB: "Ethiopian Birr",
        EUR: "Euro",
        FJD: "Fijian Dollar",
        FKP: "Falkland Islands Pound",
        GBP: "British Pound Sterling",
        GEL: "Georgian Lari",
        GGP: "Guernsey Pound",
        GHS: "Ghanaian Cedi",
        GIP: "Gibraltar Pound",
        GMD: "Gambian Dalasi",
        GNF: "Guinean Franc",
        GTQ: "Guatemalan Quetzal",
        GYD: "Guyanaese Dollar",
        HKD: "Hong Kong Dollar",
        HNL: "Honduran Lempira",
        HRK: "Croatian Kuna",
        HTG: "Haitian Gourde",
        HUF: "Hungarian Forint",
        IDR: "Indonesian Rupiah",
        ILS: "Israeli New Sheqel",
        IMP: "Isle of Man Pound",
        INR: "Indian Rupee",
        IQD: "Iraqi Dinar",
        IRR: "Iranian Rial",
        ISK: "Icelandic Króna",
        JEP: "Jersey Pound",
        JMD: "Jamaican Dollar",
        JOD: "Jordanian Dinar",
        JPY: "Japanese Yen",
        KES: "Kenyan Shilling",
        KGS: "Kyrgystani Som",
        KHR: "Cambodian Riel",
        KMF: "Comorian Franc",
        KPW: "North Korean Won",
        KRW: "South Korean Won",
        KWD: "Kuwaiti Dinar",
        KYD: "Cayman Islands Dollar",
        KZT: "Kazakhstani Tenge",
        LAK: "Laotian Kip",
        LBP: "Lebanese Pound",
        LKR: "Sri Lankan Rupee",
        LRD: "Liberian Dollar",
        LSL: "Lesotho Loti",
        LTL: "Lithuanian Litas",
        LVL: "Latvian Lats",
        LYD: "Libyan Dinar",
        MAD: "Moroccan Dirham",
        MDL: "Moldovan Leu",
        MGA: "Malagasy Ariary",
        MKD: "Macedonian Denar",
        MMK: "Myanma Kyat",
        MNT: "Mongolian Tugrik",
        MOP: "Macanese Pataca",
        MRO: "Mauritanian Ouguiya",
        MUR: "Mauritian Rupee",
        MVR: "Maldivian Rufiyaa",
        MWK: "Malawian Kwacha",
        MXN: "Mexican Peso",
        MYR: "Malaysian Ringgit",
        MZN: "Mozambican Metical",
        NAD: "Namibian Dollar",
        NGN: "Nigerian Naira",
        NIO: "Nicaraguan Córdoba",
        NOK: "Norwegian Krone",
        NPR: "Nepalese Rupee",
        NZD: "New Zealand Dollar",
        OMR: "Omani Rial",
        PAB: "Panamanian Balboa",
        PEN: "Peruvian Nuevo Sol",
        PGK: "Papua New Guinean Kina",
        PHP: "Philippine Peso",
        PKR: "Pakistani Rupee",
        PLN: "Polish Złoty",
        PYG: "Paraguayan Guarani",
        QAR: "Qatari Rial",
        RON: "Romanian Leu",
        RSD: "Serbian Dinar",
        RUB: "Russian Ruble",
        RWF: "Rwandan Franc",
        SAR: "Saudi Riyal",
        SBD: "Solomon Islands Dollar",
        SCR: "Seychellois Rupee",
        SDG: "Sudanese Pound",
        SEK: "Swedish Krona",
        SGD: "Singapore Dollar",
        SHP: "Saint Helena Pound",
        SLE: "Sierra Leonean Leone",
        SLL: "Sierra Leonean Leone (Obsolete)",
        SOS: "Somali Shilling",
        SSP: "South Sudanese Pound",
        SRD: "Surinamese Dollar",
        STD: "São Tomé and Príncipe Dobra",
        SVC: "Salvadoran Colón",
        SYP: "Syrian Pound",
        SZL: "Swazi Lilangeni",
        THB: "Thai Baht",
        TJS: "Tajikistani Somoni",
        TMT: "Turkmenistani Manat",
        TND: "Tunisian Dinar",
        TOP: "Tongan Paʻanga",
        TRY: "Turkish Lira",
        TTD: "Trinidad and Tobago Dollar",
        TWD: "New Taiwan Dollar",
        TZS: "Tanzanian Shilling",
        UAH: "Ukrainian Hryvnia",
        UGX: "Ugandan Shilling",
        USD: "United States Dollar",
        UYU: "Uruguayan Peso",
        UZS: "Uzbekistan Som",
        VEF: "Venezuelan Bolívar",
        VES: "Venezuelan Bolívar Soberano",
        VND: "Vietnamese Dong",
        VUV: "Vanuatu Vatu",
        WST: "Samoan Tala",
        XAF: "Central African CFA Franc",
        XAG: "Silver Ounce",
        XAU: "Gold Ounce",
        XCD: "East Caribbean Dollar",
        XDR: "International Monetary Fund (IMF) Special Drawing Rights",
        XOF: "West African CFA Franc",
        XPF: "CFP Franc",
        YER: "Yemeni Rial",
        ZAR: "South African Rand",
        ZMK: "Zambian Kwacha (Obsolete)",
        ZMW: "Zambian Kwacha",
        ZWL: "Zimbabwean Dollar",
    };
}

export async function getNetflixData() {
    const res = await fetch(
        "https://y1n6ki1vz3.execute-api.us-west-2.amazonaws.com/v1/data",
        {
            mode: "no-cors",
            method: "get",
        }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}

export async function getICloudData() {
    const res = await fetch(
        "https://h80plprc7h.execute-api.us-west-2.amazonaws.com/prod/data",
        {
            mode: "no-cors",
            method: "get",
        }
    );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
}
