import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
   const [data, setData] = useState(null);
   const onClick = async () => {
      try {
         const response = await axios.get(
            'https://newsapi.org/v2/top-headlines?country=kr&apiKey=9a930de1c908403bb469d8a6bfd57068'
         );
         setData(response.data);
      } catch (e) {
         console.log(e);
      }
   };
   return (
      <div>
         <div>
            <button onClick={onClick}>불러오기</button>
         </div>
         {data && <textarea rows={7} value={JSON.stringify(data, null, 2)} />}
      </div>
   );
};

export default App;
