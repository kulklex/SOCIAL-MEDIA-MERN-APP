import React, {useState} from 'react';

const Counter = () => {

    const [showCounter, setShowCounter] = useState(false);
    const [counter, SetCounter] = useState(0);    
    const increment = () => {
        SetCounter(previousCount => previousCount + 1)
        setShowCounter(prev => !prev);
    }

    const obj = {
        a: {
            c: 3
        }, 
        b: 2
    }


    const obj2 = {
        ...obj, 
        a: {...obj.a, c: 42},

    }


    const arr = ['a', 'b']
    const arr2 = arr.concat('c')
    const arr3 = arr.slice()
    arr3.push('c')

    arr2.reduce()
    return (
        <div>
            
            {showCounter && <h1>{counter}</h1>}

            <button onClick={increment}>Increase</button>
        </div>
    );
}

export default Counter;
