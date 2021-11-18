# ✔️ 리액트를 다루는 기술 - 김민준 
<br>

## 1. 리액트 시작

### 　 1.2 리액트 특징

-  **Virtual DOM** (Document Object Model): 실제 DOM(객체로 문서구조 표현)에 접근해 조작하는 대신 추상화한 자바스크립트 객체를 구성해 사용 → 최소한의 연산으로 DOM 트리 업데이트 (바뀐 부분만 실제 DOM에 적용)
  
  <br>

## 2. JSX

### 　 2.3 JSX 장점

-  가독성, 익숙함(html과 유사)
-  바벨이 코드 오류 감지

### 　 2.4 JSX 문법

-  하나의 부모 요소로 감싸기(컴포넌트 내부는 DOM 트리 구조 하나여야 한다는 규칙)
-  div 대신 Fragment 사용 가능 `<Fragment>` `</Fragment>`
-  JSX 안에서 자바스크립트 표현식 사용 가능 → `{}` 내부에 작성
-  `const` vs `let` → const는 한 번 상수 지정하면 변경 불가능 / let은 동적인 값을 담는 변수 선언할 때 사용
-  특정조건을 만족할 때와 아닐 때 다르게 렌더링 → JSX 밖에서 if문 사용(JSX 내부 자바스크립트 표현식에서 if문 사용 불가) / {} 안에 `삼항연산자` 사용
-  특정 조건을 만족할 때만 렌더링(조건부 렌더링) → `&&` 사용
-  인라인 스타일링: css를 자바스크립트 객체 형태로 적용
-  ~~class~~ → className
-  항상 태그 닫기 (html은 \<input>,\<br> 등 닫지 않아도 되는 태그 존재 but JSX는 항상 태그 닫기)
-  self-closed 태그에서는 // 이렇게 or /_ 이런식 _/ 으로 주석 달기 가능 (단, />는 꼭 마지막 새 줄로)
   
   <br>

## 3. 컴포넌트

### 　 3.1 클래스형 컴포넌트
-  클래스형 컴포넌트 vs 함수형 컴포넌트
   -  **클래스형 컴포넌트**: state 기능, 라이프사이클 기능 사용 가능 / 임의 메소드 정의 가능 / render 함수 필수(render 내부에 보여줄 JSX 기입)
   -  **함수형 컴포넌트**: 선언 수월, 메모리 자원 덜 사용 / state, 라이프사이클 API 사용 불가 → Hooks로 해결! <br>
      → react 공식 매뉴얼에서는 **`함수형 컴포넌트 + Hooks`** 사용 권고
### 　 3.2 첫 컴포넌트 생성 
 　 **cf) ES6 화살표 함수**: 함수를 파라미터로 전달할 때 유용
### 　 3.3 props
- 컴포넌트 속성을 설정할 때 사용하는 요소
- props는 부모 컴포넌트에서 설정
- children: 컴포넌트 태그 사이의 내용을 보여주는 props
- 함수형 컴포넌트에서 파라미터 부분에 비구조화 할당 문법 사용(ES6)
- propTypes 사용해 props의 타입을 지정(지정 시 isRequired 이용해 필수사항으로 설정 가능)
### 　 3.4 state
- state: 컴포넌트 안에서 바뀔 수 있는 값(props의 경우, 부모 컴포넌트가 설정한 props값을 컴포넌트 자신은 바꿀 수 X)
1) 클래스형 컴포넌트의 state
   - state 초기값 설정 → constructor 메소드 사용 or state = { number: 0 }; 이런식으로 설정
   - this.setState() 사용하면 state값 비동기적으로 업데이트
2) 함수형 컴포넌트의 `useState`
   - useState 함수 호출 시 배열 반환 → 배열의 첫번째 원소는 현재 상태, 두 번째 원소는 상태를 바꿔주는 함수(Setter함수) <br>
     ex) const \[message, setMessage] = useState('');
### 　 3.5 state 사용 시 주의사항
- state값 변경 시 반드시 setState(클래스형 컴포넌트) 또는 useState 통헤 전달받은 Setter 함수(함수형 컴포넌트) 사용 <br>
**→ 배열이나 객체 업데이트하고 싶을 때는 사본을 만들어 그 사본에 값을 업데이트한 후 setState 또는 Setter함수 사용해 업데이트**
### 　 3.6 정리
- props 사용 시 값이 반드시 고정적인 것은 X <br>
→ 부모 컴포넌트의 state를 자식 컴포넌트의 props로 전달, 자식 컴포넌트에서 특정 이벤트 발생 시 부모 컴포넌트의 메소드 호출 <br>
→ props 유동적으로 사용 가능
<br>

## 4. 이벤트 핸들링
### 　 4.1 리액트의 이벤트 시스템
- 이벤트 사용 시 주의사항
  - Camel case로 작성 <br>
  ex)onKeyUp
  - 자바스크립트 코드 전달하는 것이 아니라 함수 형태의 값 전달
  - DOM 요소에만 이벤트 설정 가능/작접 만든 컴포넌트에는 설정X <br>
  ex)div, button, input, form, span에는 설정 가능
### 　 4.2 예제로 이벤트 핸들링 익히기
- 이벤트 처리 시 렌더링과 동시에 함수를 만들지 않고 미리 임의 메소드를 따로 만들어 전달(가독성↑)
- 객체 안에서 key를 \[ ]로 감싸면 안에 넣은 레퍼런스가 가리키는 실제 값이 key값으로 사용 <br>
```
const name = 'variantKey';
const object = {
  [name]: 'value',
};
```
 → 결과
```
{
  'variantKey': 'value'
}
```
- onKeyPress 이벤트를 이용해 엔터 눌렀을 때 특정 메소드가 호출되도록 설정 가능

### 　 4.3 함수형 컴포넌트로 구현해 보기
- 여러 input들의 상태를 관리하기 위해 useState 쓸 때 문자열이 아닌 객체를 사용(Ch 4.3 commit 참고) <br>
→ 8장 useReducer와 custom Hooks를 사용하면 더 쉽게 가능
<br>
<br>

## Ch5 ref: DOM에 이름 달기

> ref(reference): react 프로젝트 내부에서 DOM에 이름을 달 때 사용
→ HTML에서 id를 사용해 이름을 다는 것과 유사
> 


💡 ***react component 내부에는 id를 사용하면 안될까?*** <br>
id를 사용할 수는 있지만, JSX 안에서 DOM에 id를 달면 해당 DOM을 렌더링할 때 그대로 전달된다. 
그러면 같은 컴포넌트를 재사용할 때 중복 id를 가진 DOM이 여러 개 생기게 되는데, 이는 HTML에서 DOM의 id가 유일해야 한다는 규칙에 어긋나게 된다.
하지만 `ref`는 컴포넌트 내부에서만 작동하기 때문에 이런 문제가 생기지 않는다.

<br>
<br>

## 5.1 ref는 어떤 상황에서 사용해야 할까?

- 특정 DOM을 꼭 직접적으로 건드려야 할 때 `ref` 사용
- 클래스형 컴포넌트에서 `ref`를 사용하고, 함수형 컴포넌트에서는 `React Hooks`를 통해 ref를 사용한다.
<br>

### 5.1.3 DOM을 꼭 사용해야 하는 상황
- state만으로는 해결할 수 없는 기능
→ `ref`를 사용해 DOM에 직접 접근해야 한다.

- `ref`를 사용해야 하는 경우
```
• 특정 input에 포커스 주기
• 스크롤 박스 조작하기
• Canvas 요소에 그림 그리기
```

→ React 공식 문서에는 `ref`를 사용해야 하는 경우를 다음과 같이 정의하고 있다.

> 포커스, 텍스트 선택영역, 혹은 미디어의 재생을 관리할 때. <br>
애니메이션을 직접적으로 실행시킬 때 <br>
서드파티 DOM 라이브러리를 React와 같이 사용할 때
> 
<br>

## 5.2 ref 사용
> ref를 사용하는 2가지 방법

### 1. 콜백 함수를 통한 ref 설정

   1) ref를 달고 싶은 요소에 ref라는 콜백 함수를 `props`로 전달한다.
   2) ref(콜백 함수)는 ref값을 `파라미터`로 전달 받는다.
   3) 파라미터로 전달 받은 ref값을 컴포넌트의 멤버 변수로 설정한다.

```jsx
<input ref={(ref) => {this.input=ref}} />
```

→ this.input은 `input 요소의 DOM`을 가리킨다.
    여기서 ref의 이름은 자유롭게 지정 가능하다. input이 아니라 아무 의미 없는 단어를 사용해도 된다.
<br>

### 2. createRef를 통한 ref 설정

- react 내장 함수인 `createRef` 함수 사용

1) 컴포넌트 내부에 멤버 변수로 React.createRef()를 담는다.
2) 해당 멤버 변수를 ref를 달고자 하는 요소에 ref props로 전달한다.

```jsx
import React, { Component } from 'react';

class RefSample extends Component {
	input = React.createRef(); //멤버 변수 input에 React.createRef() 담기

	handleFocus = () => {
		this.input.current.focus(); //ref 설정 뒤 나중에 ref를 설정한 DOM에 접근하려면
	}                             //.current를 넣어주어야 한다.

	render() {
		return (
			<div>
				<input ref={this.input} /> //input을 ref props로 전달
      </div>
    );
  }
}

export default RefSample;
```

→ ref 설정 후 설정한 DOM에 접근하려면 `this.input.current`처럼 뒤에 `.current`를 추가로 
    붙여줘야 한다.
<br>
<br>

## 5.3 컴포넌트에 ref 달기

> 컴포넌트에 ref를 달아 컴포넌트 외부에서 내부에 있는 DOM을 사용한다.

```jsx
<MyComponent
		ref={(ref) => {this.myComponent=ref}}
/>
```

→ 외부에서 MyComponent 내부의 메소드 및 변수에 접근 가능
<br>
<br>
<br>

**ScrollBox 컴포넌트를 만들고, 외부(부모 컴포넌트)에서 스크롤바를 아래로 내리는 작업을 `ref`를 사용해 수행해보자**

### ScrollBox.js

```jsx
import React, { Component } from 'react';

class ScrollBox extends Component {
   scrollToBottom = () => {
      const { scrollHeight, clientHeight } = this.box; //비구조화 할당 문법
      this.box.scrollTop = scrollHeight - clientHeight;
   };

   render() {
      const style = {
         border: '1px solid black',
         height: '300px',
         width: '300px',
         overflow: 'auto',
         position: 'relative',
      };

      const innerStyle = {
         width: '100%',
         height: '650px',
         background: 'linear-gradient(white, black)',
      };

      return (
         <div
            style={style}
            ref={(ref) => {
               this.box = ref;
            }}
         >
            <div style={innerStyle} />
         </div>
      );
   }
}

export default ScrollBox;
```

### App.js

```jsx
import React, { Component } from 'react';
import ScrollBox from './ScrollBox';

class App extends Component {
   render() {
      return (
         <div>
            <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
            <button onClick={() => this.scrollBox.scrollToBottom()}>
               맨 밑으로 이동
            </button>
         </div>
      );
   }
}

export default App;
```

→ ScrollBox에 ref를 적용해 버튼에 onClick 이벤트 발생 시 ScrollBox 컴포넌트의 scrollToBottom 메소드
    수행
<br>
<br>

```jsx
onClick={this.scrollBox.scrollToBottom}
```
→ 위와 같이 작성하면 컴포넌트가 처음 렌더링될 때는 this.scrollBox 값이 `undefined`인 상태이므로, this.scrollBox.scrollToBottom 값을 읽어올 때 오류 발생
<br>

```jsx
onClick = {() => this.scrollBox.scrollToBottom()}
```
→ 화살표 함수로 새로운 함수를 만들고 내부에서 this.scrollBox.scrollToBottom 메소드 실행 <br>
→ 버튼을 누를 때는 이미 this.scrollBox가 설정된 상태이므로, 값을 읽어올 때 오류가 발생하지 않는다.
<br>
<br>
<br>

### ❗️주의
- 서로 다른 컴포넌트끼리 데이터를 교류할 때 ref를 사용하는 것은 잘못된 방법이다. <br>
ref 사용은 최소한으로 하는 것이 좋다! <br>
→ 컴포넌트끼리 데이터를 교류할 때 기본적으로 부모-자식 흐름으로 진행해야 한다.
