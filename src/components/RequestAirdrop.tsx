import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, TransactionSignature } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import { ParimutuelWeb3, PositionSideEnum, WalletSigner, DEV_CONFIG, MarketPairEnum, getMarketPubkeys } from '@hxronetwork/parimutuelsdk';


export const RequestAirdrop: FC = () =>{
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const wallet = useWallet()

    const config = DEV_CONFIG;
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    const onClick = useCallback(async () => {
        if (!publicKey) {
            notify({ type: 'error', message: `Wallet not connected!` });
            console.log('error', `Send Transaction: Wallet not connected!`);
            return;
        }
        const market = MarketPairEnum.BTCUSD;
        const markets = getMarketPubkeys(config, market);
        const marketsByTime = markets.filter((market) => market.duration === 60 * 5);
        const parimutuels = await parimutuelWeb3.getParimutuels(marketsByTime);
        const duration = marketsByTime[0].duration;
      
        const pari_markets = parimutuels.filter(
                (account) =>
                  account.info.parimutuel.timeWindowStart.toNumber() > Date.now() &&
                  account.info.parimutuel.timeWindowStart.toNumber() <
                    Date.now() + duration * 1000
              );
        const pubkey = pari_markets[0].pubkey.toString();

        let signature: TransactionSignature = '';
        try {

            const transactionId = await parimutuelWeb3.placePosition(
                wallet as WalletSigner,
                new PublicKey(pubkey),
                parseFloat('100') * (10 ** 9 / 1),
                PositionSideEnum.SHORT,
                Date.now(),
            )

            if (transactionId) {
                console.log('MAMAGUEVO', transactionId);
                notify({ type: 'success', message: 'LFG you placed a position', txid: transactionId });
            }


            // signature = await sendTransaction(transaction, connection);
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });
        } catch (error: any) {
            notify({ type: 'error', message: `Transaction failed!`, description: error?.message, txid: signature });
            console.log('error', `Transaction failed! ${error?.message}`, signature);
            return;
        }
    }, [publicKey, notify, connection, sendTransaction]);

    return (
        <div>
            <button
                className="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ... "
                onClick={onClick} disabled={!publicKey}
            >
                <div className="hidden group-disabled:block ">
                    Wallet not connected
                </div>
                <span className="block group-disabled:hidden" > 
                    Place 100 USDC Short
                </span>
            </button>
        </div>
    );
};
