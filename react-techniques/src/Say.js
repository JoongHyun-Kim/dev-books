import React, { useState } from 'react';

const Say = () => {
   const [message, setMessage] = useState('');
   const onClickEnter = () => setMessage('안녕하세요!');
   const onClickLeave = () => setMessage('안녕히 가세요!');

   const [color, setColor] = useState('black');

   return (
      <div>
         <button onClick={onClickEnter}>입장</button>
         <button onClick={onClickLeave}>퇴장</button>
         <h1 style={{ color }}>{message}</h1>
         <button
            style={{ backgroundColor: 'black', color: 'white' }}
            onClick={() => setColor('black')}
         >
            Black
         </button>
         <button
            style={{ backgroundColor: 'red', color: 'white' }}
            onClick={() => setColor('red')}
         >
            Red
         </button>
         <button
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={() => setColor('green')}
         >
            Green
         </button>
         <button
            style={{ backgroundColor: 'blue', color: 'white' }}
            onClick={() => setColor('blue')}
         >
            Blue
         </button>
         <button
            style={{ backgroundColor: 'purple', color: 'white' }}
            onClick={() => setColor('purple')}
         >
            Purple
         </button>
      </div>
   );
};

export default Say;
