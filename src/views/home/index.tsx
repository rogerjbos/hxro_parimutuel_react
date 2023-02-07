// Next, React
import { FC, useEffect } from 'react';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

export const HomeView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <h1 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]">
          {/* Parimutuel Protocol */}
          Gm World!
        </h1>
        {/* {wallet && <p>SOL Balance: {(balance || 0).toLocaleString()}</p>} */}
        <div className="text-center" style={{ alignContent: 'center', marginTop: '30px', fontSize: '25px'}}>
          {/* vvvvvvDELETE THISvvvvvv */}
          <h1>This is our starter template for our project,<br/>in this tutorial walthrough you will learn how to use:</h1>
          <h1 style={{marginTop: '10px'}}><code style={{color: 'teal'}}>placePosition()</code></h1>
          <h1><code style={{color: 'teal'}}>getUserPosition()</code></h1>
          <h1><code style={{color: 'teal'}}>cancelPosition()</code></h1>
          <h1 style={{marginTop: '10px'}}>From the Parimutuel Typescript SDK, and make a nice UI our users will love to interact width! <br/>Let's get right into it!</h1>
          {/* ^^^^^DELETE THIS^^^^^ */}
        </div>
      </div>
    </div>

  );
};


