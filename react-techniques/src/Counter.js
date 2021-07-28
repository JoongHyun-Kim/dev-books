import React, { Component } from 'react';

class Counter extends Component {
   constructor(props) {
      super(props);
      this.state = {
         //state 초기값 설정
         number: 0,
      };
   }
   render() {
      const { number } = this.state; //state를 조회할 때는 this.state로 조회
      return (
         <div>
            <h1>{number}</h1>
            <button
               onClick={() => {
                  this.setState({ number: number + 1 }); //setState를 이용해 state에 새로운 값 설정
               }}
            >
               +1
            </button>
         </div>
      );
   }
}

export default Counter;
