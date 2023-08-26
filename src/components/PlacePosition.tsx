import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { FC, useCallback, useEffect } from 'react';
import { notify } from "../utils/notifications";
import { ParimutuelWeb3, PositionSideEnum, WalletSigner } from '@hxronetwork/parimutuelsdk';
import { PariConfig } from './Config';

const PlacePosition: FC<{pariPubkey: string, side: PositionSideEnum, amount: string}> = (props) => {
    const { connection } = useConnection();
    const { publicKey, signTransaction } = useWallet();
    const wallet = useWallet()

    const { config } = PariConfig;
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    const {pariPubkey, side, amount} = props

    useEffect(() => {
    }, [pariPubkey]);

    const onClick = useCallback(async (amount: string, pariPubkey: string) => {
        if (!publicKey) {
          notify({ type: 'error', message: 'Wallet not connected!' });
          console.error('Send Transaction: Wallet not connected!');
          return;
        }
        let transactionId = '';
        try {
      
          transactionId = await parimutuelWeb3.placePosition(
            wallet as WalletSigner,
            new PublicKey(pariPubkey),
            parseFloat(amount) * (10 ** 9 / 1),
            side,
            Date.now()
          );
      
          if (transactionId) {
            console.log(`Transaction: ${transactionId}`);
            notify({ type: 'success', message: `Placed ${side === PositionSideEnum.LONG ? 'LONG' : 'SHORT'} Position`, txid: transactionId });
          }
        } catch (error) {
          notify({ type: 'error', message: 'Transaction failed!', description: error.message, txid: transactionId });
          console.error(`Transaction failed! ${error.message}`, transactionId);
          return;
        }
      }, [publicKey, notify, connection, signTransaction]);

      const bgGradientClass =
            side === PositionSideEnum.LONG
            ? 'bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-teal-500 hover:to-indigo-500'
            : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500';

            return (
                <div style={{ textAlign: 'center' }}>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder={inputValue}
                        style={{ color: 'black', borderRadius: '10px', display: 'inline-block', textAlign: 'center', }}
                    />
            {/*
            Here is where we are going to use the PlacePostion component and 
            pass it in amount and pubkey to place the position of the user
            
                    <div style={{ marginLeft: '-15px', marginTop: '10px' }}>
                        <PlacePosition amount={amount} pariPubkey={pubkey} side={PositionSideEnum.LONG}/>
                        <PlacePosition amount={amount} pariPubkey={pubkey} side={PositionSideEnum.SHORT} />
                    </div>
            */}
                </div>
        );
    };
        
    export default PlacePositionBox;

}

