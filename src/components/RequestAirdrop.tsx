import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, TransactionSignature, PublicKey } from '@solana/web3.js';
import { FC, useCallback } from 'react';
import { notify } from "../utils/notifications";
import useUserSOLBalanceStore from '../stores/useUserSOLBalanceStore';
import { ParimutuelWeb3, PositionSideEnum, WalletSigner, DEV_CONFIG, MarketPairEnum, getMarketPubkeys } from '@hxronetwork/parimutuelsdk';


export const RequestAirdrop: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const { getUserSOLBalance } = useUserSOLBalanceStore();

    const wallet = useWallet()
    const config = DEV_CONFIG;
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    const onClick = useCallback(async () => {
        if (!publicKey) {
            console.log('error', 'Wallet not connected!');
            notify({ type: 'error', message: 'error', description: 'Wallet not connected!' });
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
                PositionSideEnum.LONG,
                Date.now(),
            )

            if (transactionId) {
                console.log('MAMAGUEVO', transactionId);
                notify({ type: 'success', message: 'LFG you placed a position', txid: transactionId });
            }


            // signature = await sendTransaction(transaction, connection);
            notify({ type: 'success', message: 'Transaction successful!', txid: signature });

        } catch (error: any) {
            notify({ type: 'error', message: `Airdrop failed!`, description: error?.message, txid: signature });
            console.log('error', `Airdrop failed! ${error?.message}`, signature);
        }
    }, [publicKey, connection, getUserSOLBalance]);

    return (
        <div>
            <button
                className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={onClick}
            >
                <span>Airdrop 1 </span>
            </button>
        </div>
    );
};

