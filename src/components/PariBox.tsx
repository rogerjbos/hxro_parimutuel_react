import { useConnection } from "@solana/wallet-adapter-react";
import { FC, useState } from "react";
import {
ParimutuelWeb3,
MarketPairEnum,
getMarketPubkeys,
calculateNetOdd,
} from "@hxronetwork/parimutuelsdk";
import { useEffect } from "react";
import { PariConfig } from "./Config";

interface PariObj {
    longPool: any; // This is how much money is in the Long Pool of the contest
    
    shortPool: any; // This is how much money is in the Short Pool of the contest
    
    longOdds: string; // This is the weighted odds of the Long Pool
    
    shortOdds: string; // This is the weighted odds of the Short Pool
    
    pubkey: string; // This is the contest pubkey
    
}//Next, create a constant named TimeInterval to store various time intervals for ease of use.

const TimeInterval = [
    {
    interval: '1M',
    seconds: 60,
    title: "1 MINUTE",
    },
    
    {
    interval: '5M',
    seconds: 300,
    title: "5 MINUTE",
    },
    
    {
    interval: '15M',
    seconds: 900,
    title: "15 MINUTE",
    },
    
    {
    interval: '1H',
    seconds: 3600,
    title: "1 HOUR",
    },
    
    {
    interval: '1D',
    seconds: 86400,
    title: "1 DAY",
    },
];
