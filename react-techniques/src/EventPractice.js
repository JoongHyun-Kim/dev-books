import React, { Component } from 'react';

class EventPractice extends Component {
   state = {
      //state 초기값 설정
      message: '',
   };

   render() {
      return (
         <div>
            <h1>이벤트 연습</h1>
            <input
               type="text"
               name="message"
               placeholder="입력"
               value={this.state.message}
               onChange={(e) => {
                  this.setState({
                     //state값 업데이트
                     message: e.target.value,
                  });
               }}
            />
         </div>
      );
   }
}

export default EventPractice;
