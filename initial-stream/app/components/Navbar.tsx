"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrency } from "../redux/slices/netflixSlice";
import { setCurrency as iCloudCurrency } from "../redux/slices/iCloudSlice";
import logo from "../images/logo.svg";
import Select from "react-select";
import { usePathname } from "next/navigation";

const streamingServices = [
    {
        name: "Netflix",
        link: "/netflix", // Adjust this link accordingly
    },
    {
        name: "iCloud",
        link: "/icloud", // Adjust this link accordingly
    },
];

const Navbar = ({
    currencies,
    currencyData,
}: {
    currencies: string[];
    currencyData: any;
}) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.netflixReducer);
    const currency = state.currency;
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBrowseOpen, setIsBrowseOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const toggleBrowse = () => {
        setIsBrowseOpen((prev) => !prev);
    };

    const currencyOptions = currencies.map((curr) => ({
        value: curr,
        label: `${curr} (${currencyData[curr]})`,
    }));

    return (
        <nav className="bg-blue-500 text-white p-4">
            <div className="mx-auto flex items-center justify-between">
                <div className="flex items-center justify-between w-full">
                    {/* Website Logo */}
                    <Link href="/" className="flex items-center">
                        <Image src={logo} alt="logo" width={250} height={250} />
                    </Link>

                    <p className="relative">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden focus:outline-none text-white hover:text-gray-200"
                        >
                            {isMenuOpen ? <RxCross2 /> : <AiOutlineMenu />}
                        </button>

                        {/* Navigation Links */}
                        <ul
                            className={`md:flex md:space-x-4 lg:gap-4 mt-4 min-w-[120px] md:flex-row md:mt-0 ${
                                isMenuOpen
                                    ? "absolute z-10 py-2 rounded shadow-lg right-0 top-7 flex text-blue-500 flex-col items-start bg-gray-200"
                                    : "hidden"
                            }`}
                        >
                            <li className="border-b flex items-center border-b-blue-500 md:border-none w-full md:w-auto pl-4 md:p-0 py-1">
                                <button
                                    onClick={toggleBrowse}
                                    className="hover:underline focus:outline-none"
                                >
                                    Browse
                                </button>
                                {isBrowseOpen && (
                                    <ul className="absolute -left-2 mt-32 py-1 bg-white border border-gray-300 rounded-lg shadow-md">
                                        {streamingServices.map((service) => (
                                            <li key={service.name}>
                                                <Link
                                                    href={service.link}
                                                    onClick={toggleBrowse}
                                                >
                                                    <p className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white">
                                                        {service.name}
                                                    </p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li className="border-b flex items-center border-b-blue-500 md:border-none w-full md:w-auto pl-4 md:p-0 py-1">
                                <Link href="/guide" className="hover:underline">
                                    Guide
                                </Link>
                            </li>
                            <li className="w-full md:w-auto md:p-0 pl-4 py-1 flex items-center">
                                <Link href="/about" className="hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li className="hidden w-full md:w-auto md:p-0 pl-4 py-1 md:flex items-center">
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
                                    onChange={(selectedOption) => {
                                        dispatch(
                                            setCurrency(selectedOption?.value)
                                        );
                                        dispatch(
                                            iCloudCurrency(
                                                selectedOption?.value
                                            )
                                        );
                                    }}
                                    className="w-[265.23px] text-black"
                                    isSearchable={true} // Enable search capabilities
                                    placeholder="Search or select currency..."
                                />
                            </li>
                        </ul>
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-end !mt-10 md:hidden">
                {/* <label className="mr-2">Currency:</label> */}
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
                    onChange={(selectedOption) => {
                        dispatch(
                            setCurrency(selectedOption?.value)
                        );
                        dispatch(
                            iCloudCurrency(
                                selectedOption?.value
                            )
                        );
                    }}
                    className="w-[265.23px] text-black"
                    isSearchable={true} // Enable search capabilities
                    placeholder="Search or select currency..."
                />
            </div>
        </nav>
    );
};

export default Navbar;
