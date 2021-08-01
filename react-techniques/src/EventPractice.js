import React, { Component } from 'react';

class EventPractice extends Component {
   state = {
      //state 초기값 설정
      message: '',
   };

   //화살표 함수 형식으로 변경
   handleChange = (e) => {
      this.setState({
         message: e.target.value,
      });
   };

   handleClick = () => {
      alert(this.state.message);
      this.setState({
         message: '',
      });
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
               onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>확인</button>
         </div>
      );
   }
}

export default EventPractice;
