
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

        