"use client";

import { createSlice } from "@reduxjs/toolkit";

interface State {
    nativeCurrency: string;
    currency: string;
    plans: string[];
}

const initialState: State = {
    nativeCurrency: "",
    //@ts-ignore
    currency:
        typeof window !== "undefined" && window.localStorage
            ? localStorage.getItem("userCurrency")
            : "",
    plans: ["50GB", "200GB", "2TB"],
};

export const iCloudSlice = createSlice({
    name: "iCloud",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("userCurrency", action.payload);
            }
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

export const { setCurrency, addPlan, setPlans } = iCloudSlice.actions;
export default iCloudSlice.reducer;
