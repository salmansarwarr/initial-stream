"use client";

import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { setCurrency } from "../redux/slices/netflixSlice";
import Select from "react-select";

const CurrencyNetflixPopup = ({ currencies, currencyData }: { currencies: string[], currencyData: any }) => {
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState(false);
    const [currency, setUserCurrency] = useState<string>("");

    // Check if the user preferences are already stored in local storage
    useEffect(() => {
        let storedCurrency: any;

        try {
            storedCurrency = localStorage.getItem("userCurrency");
        } catch (error) {
            storedCurrency = null;
        } finally {
            if (!storedCurrency) {
                setShowPopup(true); // show the popup
            } else {
                setUserCurrency(storedCurrency);
            }
        }
    }, []);

    const handleSavePreferences = () => {
        localStorage.setItem("userCurrency", currency);
        setShowPopup(false);
        dispatch(setCurrency(currency));
    };

    if (!showPopup) {
        return null; // Don't render the popup if user preferences are already set
    }

    const currencyOptions = currencies.map((curr) => ({
        value: curr,
        label: `${curr} (${currencyData[curr]})`,
    }));

    return (
        <div className="fixed px-2 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 !z-[1000]">
            <div className="bg-white p-8 rounded-lg shadow-lg text-black">
                <h3 className="text-lg font-bold mb-4">
                    Select your currency:
                </h3>
                <Select
                    options={currencyOptions}
                    value={
                        currency
                            ? {
                                  value: currency,
                                  label: `${currency} (${currencyData[currency]})`,
                              }
                            : null
                    }
                    onChange={(selectedOption) =>
                        setUserCurrency(selectedOption?.value || "")
                    }
                    className="w-full"
                    isSearchable={true} // Enable search capabilities
                    placeholder="Search or select currency..."
                />
                <a
                    href="/"
                    type="button"
                    onClick={handleSavePreferences}
                    className="w-full mt-12 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-center"
                >
                    Save Preferences
                </a>
            </div>
        </div>
    );
};

export default CurrencyNetflixPopup;
