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

export const PariBox: FC<{ time: string }> = (props) => {
    const { time } = props;
    
    const selectedTime = TimeInterval.filter((data) => data.interval === time);

    const timeSeconds = selectedTime[0].seconds 
    
    const timeTitle = selectedTime[0].title

    const [pariObj, setPariObj] = useState<PariObj>();

    const [countDownTime, setCountDownTime] = useState<string>("");

    const { config } = PariConfig;

    const { connection } = useConnection();
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    // To get only the BTC-USD Market Contests
    const marketPair = MarketPairEnum.BTCUSD;

    const markets = getMarketPubkeys(config, marketPair);
    const marketsByTime = markets.filter(
    (market) => market.duration === timeSeconds
    );

    useEffect(() => {
        const getPariData = async () => {
        
        // make sure that we don't exceed the localStorage 10MB capacity when
        // calling our data
        localStorage.clear();
        
        // Fetch contest data and set it in the pariObj state
        };
        fetchData();
    }, []);

    const parimutuels = await parimutuelWeb3.getParimutuels(marketsByTime);
    const duration = marketsByTime[0].duration;

    const getMarkets = await parimutuelWeb3.getMarkets(market)

    const pari_markets = parimutuels.filter(
        (account) =>
        account.info.parimutuel.timeWindowStart.toNumber() > Date.now() &&
        account.info.parimutuel.timeWindowStart.toNumber() <
        Date.now() + duration * 1000
    );

    // Assign active long and active short pools and divide them by USDC 
    // decimal size to get the real amount
    let longPool: any = (pari_markets[0].info.parimutuel.activeLongPositions.toNumber() /
    1_000_000_000);
    let shortPool: any = (pari_markets[0].info.parimutuel.activeShortPositions.toNumber() /
    1_000_000_000);

    // Calculate the odds for long and short pools with the 
    // calculateNetOdds(side, totalPool, rake) method from the SDK 
    // by passing it in the respective pool side, total pool size, 
    // and the rake which is the fee that the Parimutuel protocol takes which is 3%
    const longOdds = calculateNetOdd(longPool, longPool + shortPool, 0.03);
    const shortOdds = calculateNetOdd(shortPool, longPool + shortPool, 0.03);

    // Get the public key of the selected parimutuel contract and turn it 
    // into a string
    const pubkey = pari_markets[0].pubkey.toString();

    // Get the lock time of the selected parimutuel contract
    const locksTime = pari_markets[0].info.parimutuel.timeWindowStart.toNumber();

    // Round the values of long and short pools to 2 decimal places
    longPool = longPool.toFixed(2)
    shortPool = shortPool.toFixed(2)

    // Now we can update our contest by setting the state of our pariObj 
    // object with this data
    setPariObj({ longPool, shortPool, longOdds, shortOdds, pubkey });

    // We declare a variable formattedTime and initialize it with "00:00:00".
    var formattedTime = "00:00:00";

    // Next, we have an if statement that checks if locksTime is truthy.
    if (locksTime) {

        //If locksTime is truthy, we calculate the difference between locksTime 
        // and the current time in milliseconds. We store this difference in the 
        // timeDiff variable.
        const currentTime = new Date().getTime();
        const timeDiff = locksTime - currentTime;

        // We then use the Math.floor method to calculate the number of hours,
        // minutes, and seconds from timeDiff.
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        // Next, we use template literals to format hours, minutes, and seconds
        // into a string that has the format "hh:mm:ss". If hours, minutes, or
        // seconds is less than 10, we add a leading "0".
        formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
                        }:${seconds < 10 ? "0" + seconds : seconds}`;
    }

        // Finally, we can setCountDownTime with formattedTime as its argument.
        setCountDownTime(formattedTime);
    };

    const intervalId = setInterval(() => getPariData(), 1000);
    return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <div style={{
                padding: 10,
                border: "1px solid white",
                borderRadius: "10px",
                boxSizing: "border-box",
                width: "250px",
                alignItems: "center",
            }}>
                <h1 style={{fontWeight: 'bold', fontSize:'30px', marginBottom:'10px'}}>{timeTitle}</h1>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginRight: "5px",
                        }}
                    >
                        <p style={{ color: "white" }}>Long Pool:</p>
                        <p style={{ color: "white" }}>Short Pool:</p>
                        <p style={{ color: "white" }}>Long Odds:</p>
                        <p style={{ color: "white" }}>Short Odds:</p>
                        <p style={{ color: "white" }}>Starts In:</p>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            marginLeft: "5px",
                        }}
                    >
                        <p style={{ color: "white", fontWeight: "bold" }}></p>
                        <p style={{ color: "white", fontWeight: "bold" }}>
                            {pariObj ? pariObj.longPool : "0"}
                        </p>
                        <p style={{ color: "white", fontWeight: "bold" }}>
                            {pariObj ? pariObj.shortPool : "0"}
                        </p>
                        <p style={{ color: "white", fontWeight: "bold" }}>
                            {pariObj ? pariObj.longOdds : "0"}
                        </p>
                        <p style={{ color: "white", fontWeight: "bold" }}>
                            {pariObj ? pariObj.shortOdds : "0"}
                        </p>
                        <p style={{ color: "white", fontWeight: "bold" }}>{countDownTime}</p>
                    </div>
                </div>
{/* 

Here is where we are going to be using the PlacePositionBox.tsx component

                <div style={{marginTop:'20px'}}>
                   <PlacePositionBox pubkey={pariObj? pariObj.pubkey : 'Loading'}/>
                </div>
*/}
            </div>

        </div>
);

