"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import countriesList from "countries-list";
import Loading from "./Loading";
import { setCurrency } from "../redux/slices/netflixSlice";
import { CurrencyRates, NetflixData } from "../Interfaces/interfaces";
import Select from "react-select";
import ScrollToTopButton from "./ScrollToTop";

const convertPrice = (
    price: number | null,
    currencyRate: Record<string, number>,
    selectedCurrency: string
): string => {
    if (currencyRate[selectedCurrency] && price) {
        const convertedPrice = price * currencyRate[selectedCurrency];

        return convertedPrice.toFixed(2);
    }

    if (price) return price.toLocaleString();
    else return "-";
};

const findCheapestPlans = (
    netflixData: NetflixData[],
    currencyRates: CurrencyRates,
    selectedCurrency: string,
    selectedPlans: string[]
): Record<string, { price: string; country_code: string }> => {
    const cheapestPlans: Record<
        string,
        { price: string; country_code: string }
    > = {};
    selectedPlans.forEach((plan) => {
        let cheapestPlan: { price: string; country_code: string } | null = null;
        netflixData.forEach((countryData) => {
            const priceInSelectedCurrency =
                //@ts-ignore
                countryData[plan] !== null
                    ? convertPrice(
                          //@ts-ignore
                          countryData[`${plan}EUR`],
                          currencyRates,
                          selectedCurrency
                      )
                    : null;

            if (priceInSelectedCurrency !== null) {
                if (
                    !cheapestPlan ||
                    Number(priceInSelectedCurrency) < Number(cheapestPlan.price)
                ) {
                    cheapestPlan = {
                        price: priceInSelectedCurrency,
                        country_code: countryData.country_code,
                    };
                }
            }
        });

        cheapestPlans[plan] = cheapestPlan || { price: "-", country_code: "" };
    });

    return cheapestPlans;
};

const planOrder = ["mobile", "basic", , "standard_ads", "standard", "premium"];

const SummaryTable = ({
    currencyRates,
    netflixData,
}: {
    currencyRates: CurrencyRates;
    netflixData: NetflixData[];
}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.netflixReducer);
    const selectedCurrency = state.currency;
    const selectedPlans = state.plans;
    const nativeCurrency = state.nativeCurrency;
    const [plan, setPlan] = useState("");
    const [sortOption, setSortOption] = useState("sort_country_az");
    const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
    const includeCountries = selectedCountries.length == 0 ? false : true;

    const countryNameFromCode = (countryCode: string): string => {
        //@ts-ignore
        const countryInfo = countriesList.countries[countryCode];
        return countryInfo ? countryInfo.name : "Unknown";
    };

    const [filteredData, setFilteredData] = useState(() => {
        // Filter the data based on selected countries
        const filteredData = netflixData.filter((countryData) => {
            const country = countryData.country_name;
            const isIncluded = selectedCountries.includes(country);
            return includeCountries ? isIncluded : !isIncluded;
        });
        filteredData.sort((a, b) => {
            const countryNameA = a.country_name;
            const countryNameB = b.country_name;
            return countryNameA.localeCompare(countryNameB);
        });

        return filteredData;
    });

    const [cheapestPlans, setCheapestPlans] = useState<
        Record<
            string,
            {
                price: string;
                country_code: string;
            }
        >
    >(
        findCheapestPlans(
            filteredData,
            currencyRates,
            selectedCurrency,
            selectedPlans
        )
    );

    const [cheapestPlansNative, setCheapestPlansNative] = useState<
        Record<
            string,
            {
                price: string;
                country_code: string;
            }
        >
    >(
        findCheapestPlans(
            filteredData,
            currencyRates,
            nativeCurrency,
            selectedPlans
        )
    );

    const [sortDirections, setSortDirections] = useState({
        basic: "asc",
        mobile: "asc",
        standard: "asc",
        premium: "asc",
        standard_ads: "asc",
    });

    const handleCountryChange = (newValue: any) => {
        const selectedCountryValues = newValue.map(
            (option: any) => option.value
        );
        setSelectedCountries(selectedCountryValues);
    };

    const handleSortChange = (option: string) => {
        setSortOption(option);
        switch (option) {
            case "lowest_mobile":
                handleColumnSort("mobile", "asc");
                break;

            case "highest_mobile":
                handleColumnSort("mobile", "desc");
                break;

            case "lowest_standard":
                handleColumnSort("standard", "asc");
                break;

            case "highest_standard":
                handleColumnSort("standard", "desc");
                break;

            case "lowest_basic":
                handleColumnSort("basic", "asc");
                break;

            case "highest_basic":
                handleColumnSort("basic", "desc");
                break;

            case "lowest_premium":
                handleColumnSort("premium", "asc");
                break;

            case "highest_premium":
                handleColumnSort("premium", "desc");
                break;

            case "highest_standard_with_ads":
                handleColumnSort("standard_ads", "desc");
                break;

            case "lowest_standard_with_ads":
                handleColumnSort("standard_ads", "asc");
                break;

            case "sort_country_az":
                handleCountrySort("asc"); // Call the function to sort countries A to Z
                break;

            case "sort_country_za":
                handleCountrySort("desc"); // Call the function to sort countries Z to A
                break;

            default:
                break;
        }
    };

    const handleCountrySort = (dir: string) => {
        const sortedData = [...filteredData];

        // Sort the data based on country names
        sortedData.sort((a, b) => {
            const countryNameA = a.country_name;
            const countryNameB = b.country_name;

            if (dir === "asc") {
                return countryNameA < countryNameB
                    ? -1
                    : countryNameA > countryNameB
                    ? 1
                    : 0;
            } else {
                return countryNameB < countryNameA
                    ? -1
                    : countryNameB > countryNameA
                    ? 1
                    : 0;
            }
        });

        setSortDirections({
            basic: "asc",
            mobile: "asc",
            standard: "asc",
            premium: "asc",
            standard_ads: "asc",
        });
        setFilteredData(
            sortedData.filter((countryData) => {
                const country = countryData.country_name;
                const isIncluded = selectedCountries.includes(country);
                return includeCountries ? isIncluded : !isIncluded;
            })
        );
    };

    const handleColumnSort = (
        column: "basic" | "mobile" | "standard" | "premium" | "standard_ads",
        dir: string
    ) => {
        setPlan(column);
        setSortDirections((prevSortDirections) => ({
            ...prevSortDirections,
            [column]: dir,
        }));
    };

    useEffect(() => {
        let currency: string;
        try {
            currency = localStorage.getItem("userCurrency") || "USD";

            dispatch(setCurrency(currency));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        const filteredData = netflixData.filter((countryData) => {
            const country = countryData.country_name;
            const isIncluded = selectedCountries.includes(country);
            return includeCountries ? isIncluded : !isIncluded;
        });
        setFilteredData(filteredData);
    }, [selectedCountries, includeCountries, netflixData]);

    useEffect(() => {
        // Convert prices in filteredData to the selected currency
        const convertedData = filteredData.map((countryData) => {
            const convertedCountryData = { ...countryData };
            for (const plan of selectedPlans) {
                //@ts-ignore
                if (convertedCountryData[plan] !== null) {
                    //@ts-ignore
                    convertedCountryData[plan] = convertPrice(
                        //@ts-ignore
                        convertedCountryData[`${plan}EUR`],
                        currencyRates,
                        selectedCurrency
                    );
                }
            }
            return convertedCountryData;
        });

        // Update cheapest plans whenever currency or selectedPlans change
        setCheapestPlans(
            findCheapestPlans(
                convertedData,
                currencyRates,
                selectedCurrency,
                selectedPlans
            )
        );
    }, [filteredData, currencyRates, selectedCurrency, selectedPlans]);

    useEffect(() => {
        // Convert prices in filteredData to the native currency
        const convertedData = filteredData.map((countryData) => {
            const convertedCountryData = { ...countryData };
            for (const plan of selectedPlans) {
                //@ts-ignore
                if (convertedCountryData[plan] !== null) {
                    //@ts-ignore
                    convertedCountryData[plan] = convertPrice(
                        //@ts-ignore
                        convertedCountryData[`${plan}EUR`],
                        currencyRates,
                        nativeCurrency
                    );
                }
            }
            return convertedCountryData;
        });

        setCheapestPlansNative(
            findCheapestPlans(
                convertedData,
                currencyRates,
                nativeCurrency,
                selectedPlans
            )
        );
    }, [filteredData, currencyRates, nativeCurrency, selectedPlans]);

    const getSortedData = () => {
        if (sortOption === "sort_country_az") {
            // Sort by country names A to Z
            return filteredData.slice().sort((a, b) => {
                const countryNameA = a.country_name;
                const countryNameB = b.country_name;
                return countryNameA.localeCompare(countryNameB);
            });
        } else if (sortOption === "sort_country_za") {
            // Sort by country names Z to A
            return filteredData.slice().sort((a, b) => {
                const countryNameA = a.country_name;
                const countryNameB = b.country_name;
                return countryNameB.localeCompare(countryNameA);
            });
        } else {
            // Sort based on the selected plan column
            return filteredData.slice().sort((a, b) => {
                //@ts-ignore
                const aValue = a[`${plan}EUR`];
                //@ts-ignore
                const bValue = b[`${plan}EUR`];

                if (aValue === null && bValue === null) return 0;
                if (aValue === null) return 1;
                if (bValue === null) return -1;

                //@ts-ignore
                if (sortDirections[plan] === "asc") {
                    return aValue - bValue;
                } else {
                    return bValue - aValue;
                }
            });
        }
    };

    const countriesOptions = netflixData.map((data) => ({
        value: data.country_name,
        label: data.country_name,
    }));

    countriesOptions.sort((a, b) => a.value.localeCompare(b.value));

    const sortedSelectedPlans = [...selectedPlans].sort(
        (a, b) => planOrder.indexOf(a) - planOrder.indexOf(b)
    );

    const formatNumberWithCommas = (number: number) => {
        const formatter = new Intl.NumberFormat();
        return formatter.format(number);
    };

    const formatNumberWithCommasAndFixed = (
        number: number,
        decimalPlaces: number
    ) => {
        const formatter = new Intl.NumberFormat(undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        });
        return formatter.format(number);
    };

    // Render the table headers with sorting functionality
    const renderTableHeaders = () => {
        return (
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2 font-semibold text-left">
                        Country
                    </th>
                    {sortedSelectedPlans.map((plan) => {
                        return (
                            <th
                                key={plan}
                                className="px-4 py-2 text-blue-600 font-semibold text-left"
                            >
                                <p className="flex items-center gap-1">
                                    {plan == "standard_ads" ? (
                                        <span>Standard with Ads</span>
                                    ) : (
                                        <span>
                                            {plan.charAt(0).toUpperCase() +
                                                plan.slice(1)}
                                        </span>
                                    )}
                                </p>
                            </th>
                        );
                    })}
                </tr>
            </thead>
        );
    };

    const renderTableRows = () => {
        return getSortedData().map((countryData) => (
            <tr key={countryData.country_code} className="hover:bg-gray-100">
                <td className="px-4 py-2 uppercase font-medium">
                    {countryData.country_name}
                </td>
                {sortedSelectedPlans.map((plan) => {
                    if (
                        plan === "basic" ||
                        plan === "mobile" ||
                        plan === "standard" ||
                        plan === "premium" ||
                        plan === "standard_ads"
                    ) {
                        const priceInSelectedCurrency = countryData[plan]
                            ? selectedCurrency == countryData.EURto
                                ? //@ts-ignore
                                  formatNumberWithCommas(countryData[plan])
                                : formatNumberWithCommas(
                                      Number(
                                          convertPrice(
                                              //@ts-ignore
                                              countryData[`${plan}EUR`],
                                              currencyRates,
                                              selectedCurrency
                                          )
                                      )
                                  )
                            : "-";

                        return (
                            <td
                                key={plan}
                                className="px-4 py-2 font-medium whitespace-nowrap"
                            >
                                {countryData[plan]
                                    ? `${
                                          Number(priceInSelectedCurrency)
                                              ? Number(
                                                    priceInSelectedCurrency
                                                ).toFixed(2)
                                              : priceInSelectedCurrency
                                      } ${selectedCurrency}`
                                    : "-"}
                            </td>
                        );
                    }
                    return null;
                })}
            </tr>
        ));
    };

    if (!selectedCurrency || !selectedPlans) {
        return <Loading />;
    }

    return (
        <div className="p-4 md:w-[80%] md:m-auto">
            <div className="flex flex-col md:block">
                <div className="mt-5">
                    <h2 className="text-2xl font-semibold mb-4">Summary</h2>
                    {sortedSelectedPlans.map((plan: string) => {
                        const cheapestPlan = cheapestPlans[plan];
                        const cheapestPlanNatiive = cheapestPlansNative[plan];

                        return (
                            cheapestPlan?.country_code && (
                                <p key={plan} className="mb-2">
                                    <span className="capitalize">
                                        {plan == "standard_ads"
                                            ? "Standard with ads"
                                            : plan}
                                    </span>{" "}
                                    at{" "}
                                    <span className="font-semibold">
                                        {formatNumberWithCommasAndFixed(
                                            Number(cheapestPlan.price),
                                            2
                                        )}{" "}
                                        {selectedCurrency}{" "}
                                        {/* {selectedCurrency !== nativeCurrency &&
                                            `(${formatNumberWithCommas(
                                                Number(cheapestPlanNatiive.price)
                                            )} ${nativeCurrency})`} */}
                                    </span>{" "}
                                    via Netflix{" "}
                                    <span className="uppercase">
                                        {countryNameFromCode(
                                            cheapestPlan.country_code.toUpperCase()
                                        )}
                                    </span>
                                </p>
                            )
                        );
                    })}
                </div>

                <div className="-mt-4">
                    <div className="flex sm:items-center gap-2 flex-col sm:flex-row justify-between pr-8">
                        <h2 className="text-2xl font-semibold mt-8">Table</h2>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center -mt-16 md:mt-0">
                        <div className="md:flex-1 flex items-start md:items-center flex-col md:flex-row mt-[4.5rem] md:mt-0">
                            <div className="w-full md:w-[60%]">
                                <Select
                                    isMulti
                                    onChange={handleCountryChange}
                                    placeholder="Select countries..."
                                    className="text-sm lg:text-base"
                                    options={countriesOptions} // Replace this with the actual country options array
                                />
                            </div>
                        </div>
                        <select
                            className="w-[75%] sm:w-[50%] md:h-full arrows border text-black rounded-md focus:outline-none focus:border-blue-700 px-2 py-2 md:w-[40%] lg:w-auto text-sm lg:text-base"
                            value={sortOption}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="sort_country_az">
                                Sort by Country A to Z
                            </option>
                            <option value="sort_country_za">
                                Sort by Country Z to A
                            </option>
                            <option value="lowest_mobile">
                                Sort by lowest price for Mobile
                            </option>
                            <option value="highest_mobile">
                                Sort by highest price for Mobile
                            </option>
                            <option value="lowest_basic">
                                Sort by lowest price for Basic
                            </option>
                            <option value="highest_basic">
                                Sort by highest price for Basic
                            </option>
                            <option value="lowest_standard_with_ads">
                                Sort by lowest price for Standard with ads
                            </option>
                            <option value="highest_standard_with_ads">
                                Sort by highest price for Standard with ads
                            </option>
                            <option value="lowest_standard">
                                Sort by lowest price for Standard
                            </option>
                            <option value="highest_standard">
                                Sort by highest price for Standard
                            </option>
                            <option value="lowest_premium">
                                Sort by lowest price for Premium
                            </option>
                            <option value="highest_premium">
                                Sort by highest price for Premium
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
                    {renderTableHeaders()}
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>
            <ScrollToTopButton />
        </div>
    );
};

export default SummaryTable;
