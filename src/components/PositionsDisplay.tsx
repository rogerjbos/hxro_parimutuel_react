import { FC, useState } from "react";
import {
    ParimutuelWeb3,
    DEV_CONFIG,
    MarketPairEnum,
    ParimutuelPosition,
} from "@hxronetwork/parimutuelsdk";
import { useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

{/*

FIXING THIS COMPONENT, THE SDK FUNCTIONS HAVE TO BE UPDATED

*/}

const PositionsDisplay: FC = () => {


    const [positionsArr, setPositionsArr] = useState<ParimutuelPosition[]>()

    const { publicKey } = useWallet()
    const { connection } = useConnection();
    const config = DEV_CONFIG;
    const market = MarketPairEnum.BTCUSD
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    useEffect(() => {
        const getPositions = async () => {
            const getMarkets = await parimutuelWeb3.getMarkets(market)
            // console.log('getMarkets: ', getMarkets)
            // const positions = await parimutuelWeb3.getUserPositions(publicKey, getMarkets)
            // console.log('getMarkets: ', positions)


            // setPositionsArr(positions)

            // console.log('POSITIONS BITCH: ', positions)
        }
        const intervalId = setInterval(() => getPositions(), 1000);

        return () => clearInterval(intervalId);
    }, [])


    if (positionsArr) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{
                    height: '150px',
                    width: '50%',
                    overflowY: 'scroll',
                    padding: 10,
                    border: "1px solid white",
                    borderRadius: "10px",
                    boxSizing: "border-box",
                    alignItems: "center",
                }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {positionsArr.map((object) => (
                            <li style={{ marginBottom: '10px' }}>
                                <div>{JSON.stringify(object)}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                No Positions...
            </div>
        )
    }
};


export default PositionsDisplay;