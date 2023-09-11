"use client";

import { createSlice } from "@reduxjs/toolkit";

interface State {
    nativeCurrency: string;
    currency: string;
    plans: string[];
}

const initialState: State = {
    nativeCurrency: "",
    currency: "",
    plans: ['50GB', '200GB', '2TB'],
};

export const iCloudSlice = createSlice({
    name: "iCloud",
    initialState,
    reducers: {
        setNativeCurrency: (state, action) => {
            state.nativeCurrency = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("userCurrency", action.payload);
            }
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        addPlan: (state, action) => {
            if (state.plans.includes(action.payload)) {
                state.plans = state.plans.filter(
                    (plan) => plan !== action.payload
                );
            } else {
                state.plans = [...state.plans, action.payload];
            }

            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem(
                    "userSelectedPlans",
                    JSON.stringify(state.plans)
                );
            }
        },
        setPlans: (state, action) => {
            state.plans = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem(
                    "userSelectedPlans",
                    JSON.stringify(action.payload)
                );
            }
        },
    },
});

export const { setNativeCurrency, setCurrency, addPlan, setPlans } =
iCloudSlice.actions;
export default iCloudSlice.reducer;
