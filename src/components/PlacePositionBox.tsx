
import { PositionSideEnum } from '@hxronetwork/parimutuelsdk'; import React, { FC, useState } from 'react'; import { useEffect } from 'react';

const PlacePositionBox: FC<{ pubkey: string }> = (props) => {
    const { pubkey } = props

    const [inputValue, setInputValue] = useState('Enter Amount...');
    const [amount, setAmount] = useState('0')

    useEffect(() => {
    }, [pubkey]);

    if (pubkey === 'Loading') {
        return (
        
        Loading...
        
        )
    }

    const handleChange = (event) => {
        setInputValue(event.target.value);
        setAmount(event.target.value);

        const handleChange = (event) => {
            setInputValue(event.target.value);
            setAmount(event.target.value);
            if (!event.target.value) {
                setInputValue('Enter Amount...');
            }
        };

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
