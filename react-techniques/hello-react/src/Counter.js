import React, { Component } from 'react';

class Counter extends Component {
   state = {
      number: 0,
      fixedNumber: 0,
   };
   render() {
      const { number, fixedNumber } = this.state; //state를 조회할 때는 this.state로 조회
      return (
         <div>
            <h1>{number}</h1>
            <h2>바뀌지 않는 값: {fixedNumber}</h2>
            <button
               onClick={() => {
                  this.setState((prevState) => {
                     //this.setState()에 객체 대신 함수를 인자로 넣어주기
                     return {
                        number: prevState.number + 1,
                     };
                  });
                  this.setState((prevState) => ({
                     number: prevState.number + 1,
                  })); //화살표함수에서 바로 객체를 반환하도록 prevState => ({ })형태
               }} //+1 버튼 한 번 누를 때마다 number값 2씩 증가
            >
               +1
            </button>
         </div>
      );
   }
}

export default Counter;
