'use client'

import React from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SuiClientProvider, WalletProvider} from "@mysten/dapp-kit";
import {networkConfig, network} from "@/config"
import "@mysten/dapp-kit/dist/index.css";

const queryClient = new QueryClient();

export default function Providers({children}: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork={network}>
                <WalletProvider autoConnect>
                    {children}
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}