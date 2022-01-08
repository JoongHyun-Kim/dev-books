# Ch14 외부 API 연동 news viewer 제작하기

> newsapi에서 제공하는 API를 이용해 최신 뉴스를 불러온 후 보여주는 프로젝트
<br>


## newsapi API 키 발급받기

- newsapi에서 API 키 발급 받기 <br>
 → [https://newsapi.org/register](https://newsapi.org/register) 가입 후 발급 받기 <br>
     발급 받은 API 키는 추후 API 요청 시 API 주소의 쿼리 파라미터로 넣어 사용

- 사용할 API (한국 뉴스를 가져오는 API)
: [https://newsapi.org/s/south-korea-news-api](https://newsapi.org/s/south-korea-news-api)

- API 주소의 두 가지 형태
  1) 전체 뉴스 불러오기 <br>
  https://newsapi.org/v2/top-headlines?**country=kr**&apiKey=1234a5678b

  2) 특정 카테고리에 해당하는 뉴스만 불러오기 <br>
  https://newsapi.org/v2/top-headlines?**country=kr**&**category=business**&apiKey=1234a5678b <br>
  → business / entertainment / health / science / sports / technology
<br>

- API 키를 이용해 불러온 데이터를 화면에 표시하기

**App.js**

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
   const [data, setData] = useState(null);
   const onClick = async () => {
      try {
         const response = await axios.get(
            'https://newsapi.org/v2/top-headlines?country=kr&apiKey=1234a5678b'
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
```
<br>

**결과 화면**
<img width="1402" alt="스크린샷 2022-01-06 오전 12 03 02" src="https://user-images.githubusercontent.com/80838501/148495208-0df6cf4d-3875-4de0-a38d-dddf75ea9bf3.png">
<br>
<br>
<br>
<br>

## news viewer UI 만들기

- 디렉토리 구조

```html
.
+-- src
  +-- components
    +-- NewsItem
    +-- NewsList
```

→ **NewsItem**: 각 뉴스의 정보를 보여주는 컴포넌트 <br>
  **NewsList**: API를 요청하고 뉴스 데이터가 들어있는 배열을 컴포넌트 배열로 변환해 렌더링해 주는 컴포넌트
<br>
<br>

### Step 1. NewsItem 제작
> NewsItem component는 article이라는 객체를 통째로 props로 받아와 사용한다


- 각 뉴스 데이터가 가지고 있는 정보로 이루어진 JSON 객체

```jsx
"source": {
        "id": null,
        "name": "YouTube"
      },
      "author": null,
      "title": "겨울올림픽 30일 앞으로‥\"쇼트트랙은 역시 한국\" (2022.01.05/뉴스데스크/MBC) - MBCNEWS",
      "description": "베이징 겨울올림픽 개막을 30일 앞두고 우리 선수들이 각오를 밝혔습니다. 전망은 어둡지만 희망을 얘기했습니다.https://imnews.imbc.com/replay/2022/nwdesk/article/6330284_35744.html#베이징올림픽 #국가대표 #쇼트트랙",
      "url": "https://www.youtube.com/watch?v=IdduUY5-hFc",
      "urlToImage": "https://i.ytimg.com/vi/IdduUY5-hFc/hqdefault.jpg",
      "publishedAt": "2022-01-05T11:49:07Z",
      "content": null
    },
```

→ 위의 필드 중 title, description, url, urlToImage 필드를 이용해 NewsItem component를 작성해보자!
```
    title: 제목
    description: 내용
    url: 링크
    urlToImage: 뉴스 이미지 
```
<br>
<br>

**NewsItem**

```jsx
import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
   display: flex;
   .thumbnail {
      margin-right: 1rem;
      img {
         display: block;
         width: 160px;
         height: 100px;
         object-fit: cover;
      }
   }
   .contents {
      h2 {
         margin: 0;
         a {
            color: black;
         }
      }
      p {
         margin: 0;
         line-height: 1.5;
         margin-top: 0.5rem;
         white-apce: normal;
      }
   }
   & + & {
      margin-top: 3rem;
   }
`;

const NewsItem = ({ article }) => { //article 객체를 props로 받아
   const { title, description, url, urlToImage } = article;
   return (
      <NewsItemBlock>
         {urlToImage && (
            <div className="thumbnail">
               <a jref={url} target="_blank" rel="noopener noreferrer">
                  <img src={urlToImage} alt="thumbnail" />
               </a>
            </div>
         )}
         <div className="contents">
            <h2>
               <a href={url} target="_blank" rel="noopoener noreferrer">
                  {title}
               </a>
            </h2>
            <p>{description}</p>
         </div>
      </NewsItemBlock>
   );
};

export default NewsItem;
```
<br>
<br>
<br>

### Step2. NewsList 제작

> 추후에 NewsList component에서 API 요청을 해 데이터를 받아 올 것이지만, 현재는 sampleArticle이라는 객체에 예시 데이터를 넣어 각 component에 전달해 예시 
데이터가 보이게 해보자

**NewsList.js**

```jsx
import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
   box-sizing: border-box;
   padding-bottom: 4rem;
   width: 768px;
   margin: 0 auto;
   margin-top: 2rem;
   @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
   }
`;

const sampleArticle = { //sample 데이터
   title: '제목',
   description: '내용',
   url: 'https://google.com',
   urlToImage: 'https://via.placeholder.com/160',
};

const NewsList = () => {
   return (
      <NewsListBlock>
         <NewsItem article={sampleArticle} />
         <NewsItem article={sampleArticle} />
         <NewsItem article={sampleArticle} />
         <NewsItem article={sampleArticle} />
         <NewsItem article={sampleArticle} />
         <NewsItem article={sampleArticle} />
      </NewsListBlock>
   );
};

export default NewsList;
```
<br>

**결과 화면**
<img width="1000" alt="스크린샷 2022-01-06 오전 1 06 02" src="https://user-images.githubusercontent.com/80838501/148495833-63c0a8d4-cbb7-4081-a849-9b9bba641c01.png">

<br>
<br>
<br>
<br>

## 데이터 연동하기

> NewsList component에서 API 호출하기

컴포넌트가 화면에 보이는 시점에 API 요청을 하기 위해 useEffect를 사용해 컴포넌트가 처음 렌더링되는 시점에 API를 요청한다.

```jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
   box-sizing: border-box;
   padding-bottom: 4rem;
   width: 768px;
   margin: 0 auto;
   margin-top: 2rem;
   @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
   }
`;

const NewsList = () => {
   const [articles, setArticles] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      //async를 사용하는 함수 따로 선언
      const fetchdata = async () => {
         setLoading(true);
         try {
            const response = await axios.get(
               'https://newsapi.org/v2/top-headlines?country=kr&apiKey=1234a5678b'
            );
            setArticles(response.data.articles);
         } catch (e) {
            console.log(e);
         }
         setLoading(false);
      };
      fetchdata();
   }, []);

   //대기 중일 때
   if (loading) {
      return <NewsListBlock>대기 중...</NewsListBlock>;
   }

   //아직 articles 값이 설정되지 않았을 때
   if (!articles) {
      return null;
   }

   //articles 값이 유효할 때
   return (
      <NewsListBlock>
         {articles.map((article) => (
            <NewsItem key={article.url} article={article} />
         ))}
      </NewsListBlock>
   );
};

export default NewsList;
```

 → useEffect에 등록하는 함수에는 `async` 를 붙이면 안된다. useEffect 내부에서 `async/await`를 사용하고 싶으면 함수 내부에 async 키워드가 붙은 다른<br>
   함수를 만들어서 사용해야 한다.

→ `loaing` 이라는 상태를 만들어 API 요청이 대기중인지 판별하는데 사용 <br>
   loading = true: 요청이 대기 중 <br>
   loading = false: 요청이 끝나면 false로 설정

→ map 함수 사용하기 전에 반드시 `!articles` 값이 null인지 아닌지 확인해야 한다. 아직 데이터가 없어 null일 때는 아직 map 함수가 없어 렌더링 과정에서<br>
  오류가 생기기 때문에 반드시 예외처리를 해주어야 한다.
<br>
<br>

**결과 화면**
- API 요청이 대기 중일 때
<img width="1000" alt="스크린샷 2022-01-06 오전 2 32 08" src="https://user-images.githubusercontent.com/80838501/148648106-779401ba-c1c1-4ac2-8af4-a3bbf260e16f.png">


- API 요청이 끝난 후 
<img width="1000" alt="스크린샷 2022-01-06 오전 2 35 26" src="https://user-images.githubusercontent.com/80838501/148510176-b009362d-7c5e-4c38-88de-de951e4ef91f.png">

<br>
<br>

## 카테고리 기능 구현하기
> 전체, 비즈니스, 엔터테인먼트, 건강, 과학, 스포츠, 기술 총 6개로 이루어진 카테고리를 구현해보자! 

<br>

### Step 1. 카테고리 선택 UI 만들기
- 디렉토리 구조
```html
.
+-- src
  +-- components
    +-- NewsItem
    +-- NewsList
    +-- Categories
```
<br>

**Categories.js**

```jsx
import React from 'react';
import styled from 'styled-components';

const categories = [
   {
      name: 'all',
      text: '전체보기',
   },
   {
      name: 'business',
      text: '비즈니스',
   },
   {
      name: 'entertainment',
      text: '엔터테인먼트',
   },
   {
      name: 'health',
      text: '건강',
   },
   {
      name: 'science',
      text: '과학',
   },
   {
      name: 'sports',
      text: '스포츠',
   },
   {
      name: 'technology',
      text: '기술',
   },
];

const CategoriesBlock = styled.div`
   display: flex;
   padding: 1rem;
   width: 768px;
   margin: 0 auto;
   @media screen and (max-width: 768px) {
      width: 100%;
      overflow-x: auto;
   }
`;

const Category = styled.div`
   font-size: 1.125rem;
   cursor: pointer;
   white-space: pre;
   text-decoration: none;
   color: inherit;
   padding-bottom: 0.25rem;

   &:hover {
      color: #495057;
   }

   & + & {
      margin-left: 1rem;
   }
`;

const Categories = () => {
   return (
      <CategoriesBlock>
         {categories.map((c) => (
            <Category key={c.name}>{c.text}</Category>
         ))}
      </CategoriesBlock>
   );
};

export default Categories;
```

→ categories 배열 안에 name과 text로 구성된 객체들을 넣어 한글로 된 카테고리(text값)와 실제 카테고리 값 (name 값)을 연결 해준다.
<br>
<br>

**결과 화면**


- App.js에서 **category** 상태를 useState로 관리하고, category 값을 업데이트하는 **onSelect** 함수를 만들자! <br>
  **category**와 **onSelect** 함수는 **Categories** component에 props로 전달하고, **category** 값은 **NewsList** component에도 전달해준다.
<br>

**App.js**
```jsx
import React, { useState, useCallback } from 'react';
import Categories from './components/Categories';
import NewsList from './components/NewsList';

const App = () => {
   const [category, setCategory] = useState('all');
   const onSelect = useCallback((category) => setCategory(category), []);

   return (
      <>
         <Categories category={category} onSelect={onSelect} />
         <NewsList category={category} />
         );
      </>
   );
};

export default App;
```
<br>
<br>

**Categories.js**
```jsx
import React from 'react';
import styled, { css } from 'styled-components';

const categories = [
   {
      name: 'all',
      text: '전체보기',
   },
   {
      name: 'business',
      text: '비즈니스',
   },
   {
      name: 'entertainment',
      text: '엔터테인먼트',
   },
   {
      name: 'health',
      text: '건강',
   },
   {
      name: 'science',
      text: '과학',
   },
   {
      name: 'sports',
      text: '스포츠',
   },
   {
      name: 'technology',
      text: '기술',
   },
];

const CategoriesBlock = styled.div`
   display: flex;
   padding: 1rem;
   width: 768px;
   margin: 0 auto;
   @media screen and (max-width: 768px) {
      width: 100%;
      overflow-x: auto;
   }
`;

const Category = styled.div`
   font-size: 1.125rem;
   cursor: pointer;
   white-space: pre;
   text-decoration: none;
   color: inherit;
   padding-bottom: 0.25rem;

   &:hover {
      color: #495057;
   }

   **${(props) =>
      props.active &&
      css`
         font-weight: 600;
         border-bottom: 2px solid purple;
         color: purple;
         &:hover {
            color: #3bc9db;
            border-bottom: 2px solid #3bc9db;
         }
      `}**

   & + & {
      margin-left: 1rem;
   }
`;

const Categories = ({ **onSelect, category** }) => {
   return (
      <CategoriesBlock>
         {categories.map((c) => (
            <Category
               key={c.name}
               **active={category === c.name}
               onClick={() => onSelect(c.name)}**
            >
               {c.text}
            </Category>
         ))}
      </CategoriesBlock>
   );
};

export default Categories;
```
→ props로 전달받은 onSelect를 각 Category component의 onClick으로 설정하고, 선택된 카테고리의 스타일을 다르게 설정
<br>
<br>

**결과 화면**
- 전체보기를 선택했을 때
<img width="640" alt="스크린샷 2022-01-06 오전 4 28 23" src="https://user-images.githubusercontent.com/80838501/148510630-c56975f1-e02c-4a80-9377-bebc37b57174.png">

- 전체보기 카테고리에 마우스 커서를 올렸을 때
<img width="626" alt="스크린샷 2022-01-06 오전 4 28 47" src="https://user-images.githubusercontent.com/80838501/148510697-3095ae37-3cac-4c36-98f4-909b22407f16.png">

- 스포츠 카테고리를 선택했을 때
<img width="636" alt="스크린샷 2022-01-06 오전 4 29 15" src="https://user-images.githubusercontent.com/80838501/148510718-f69f3224-231a-4562-9506-e0976deb45d0.png">

<br>
<br>
<br>

### Step 2. API를 호출할 때 카테고리 지정하기
> NewsList component에서 현재 props로 받아 온 category에 따라 카테고리를 지정해 API 요청하기

아직까지는 카테고리에 따라 해당되는 뉴스가 뜨지 않는다. category 값에 따라 카테고리를 다르게 지정해 알맞은 카테고리에 속하도록 구현해보자!
<br>
<br>

**NewsList.js**
```jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';

const NewsListBlock = styled.div`
   box-sizing: border-box;
   padding-bottom: 4rem;
   width: 768px;
   margin: 0 auto;
   margin-top: 2rem;
   @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
   }
`;

const NewsList = ({ **category** }) => { //props로 category 값 넘겨주기
   const [articles, setArticles] = useState(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      //async를 사용하는 함수 따로 선언
      const fetchdata = async () => {
         setLoading(true);
         try {
            **const query = category === 'all' ? '' : `&category=${category}`;**
            const response = await axios.get(
               `https://newsapi.org/v2/top-headlines?country=kr**${query}**&apiKey=1234a5678b`
            );
            setArticles(response.data.articles);
         } catch (e) {
            console.log(e);
         }
         setLoading(false);
      };
      fetchdata();
   }, [**category**]); //category값 업데이트될 때마다 뉴스 새로 불러오기

   //대기 중일 때
   if (loading) {
      return <NewsListBlock>대기 중...</NewsListBlock>;
   }

   //아직 articles 값이 설정되지 않았을 때
   if (!articles) {
      return null;
   }

   //articles 값이 유효할 때
   return (
      <NewsListBlock>
         {articles.map((article) => (
            <NewsItem key={article.url} article={article} />
         ))}
      </NewsListBlock>
   );
};

export default NewsList;
```
→ category 값이 **all**이면 query값을 **공백**으로 설정하고, **all이 아니면** **“&category=카테고리”** 형태로 문자열 생성해 query 값 설정<br>
→ category값이 바뀔 때마다 (예를 들어, 다른 카테고리를 클릭할 경우) 뉴스를 새로 불러와야 하기 때문에 useEffect의 두 번째 파라미터에 **category**를<br> 넣어주어야 한다.
<br>
<br>

**결과 화면**
- 기술 카테고리
<img width="1000" alt="스크린샷 2022-01-06 오전 4 54 33" src="https://user-images.githubusercontent.com/80838501/148510998-837a1c92-8631-4ec0-968d-92877c68a2f4.png">

- 과학 카테고리
<img width="1000" alt="스크린샷 2022-01-06 오전 4 55 05" src="https://user-images.githubusercontent.com/80838501/148511025-1ec2fd6a-8344-4e73-81fd-49656aec1b93.png">
<br>
<br>
<br>
<br>

## 리액트 라우터 적용하기
> category 값을 useState 대신 라우터의 URL 파라미터를 사용해 관리해보자!
<br>

### Step 1. NewsPage 생성
- 디렉토리 구조
```jsx
.
+-- src
  +-- components
    +-- NewsItem
    +-- NewsList
    +-- Categories
  +-- pages
    +-- NewsPage
```
<br>

**NewsPage.js**
```jsx
import React from 'react';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = ({ match }) => {
   //카테고리가 선택되지 않았으면 기본값 all 사용
   const category = match.params.category || 'all';

   return (
      <>
         <Categories />
         <NewsList category={category} />
      </>
   );
};
```
<br>
<br>

**App.js**
```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
   return **<Route path="/:category?" component={NewsPage} />;**
};

export default App;
```
→ Route의 path가 category값이 달라짐에 따라 변경되도록 설정한다. 이때, 해당 path 즉 category에 맞는 NewsPage를 component에 넣어준다. <br>
NewsPage는 Categories component와 해당 category의 NewsList로 구성되어 있다.
<br>
<br>
<br>

### Step 2. Categories에서 NavLink 사용하기
> Categories에서 onSelect를 호출해 카테고리를 선택하고 선택된 카테고리의 스타일을 변경하는 기능을 NavLink로 대체해보자!
<br>

**Categories.js**

```jsx
import React from 'react';
import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
   {
      name: 'all',
      text: '전체보기',
   },
   {
      name: 'business',
      text: '비즈니스',
   },
   {
      name: 'entertainment',
      text: '엔터테인먼트',
   },
   {
      name: 'health',
      text: '건강',
   },
   {
      name: 'science',
      text: '과학',
   },
   {
      name: 'sports',
      text: '스포츠',
   },
   {
      name: 'technology',
      text: '기술',
   },
];

const CategoriesBlock = styled.div`
   display: flex;
   padding: 1rem;
   width: 768px;
   margin: 0 auto;
   @media screen and (max-width: 768px) {
      width: 100%;
      overflow-x: auto;
   }
`;

const Category = styled**(NavLink)**`
   font-size: 1.125rem;
   cursor: pointer;
   white-space: pre;
   text-decoration: none;
   color: inherit;
   padding-bottom: 0.25rem;

   &:hover {
      color: #495057;
   }

   &.active {
      font-weight: 600;
      border-bottom: 2px solid purple;
      color: purple;
      &:hover {
         color: #3bc9db;
         border-bottom: 2px solid #3bc9db;
      }
   }

   & + & {
      margin-left: 1rem;
   }
`;

const Categories = () => {
   return (
      <CategoriesBlock>
         {categories.map((c) => (
            <Category
               key={c.name}
               activeClassName="active"
               exact={c.name === 'all'}
               to={c.name === 'all' ? '/' : `/${c.name}`}
            >
               {c.text}
            </Category>
         ))}
      </CategoriesBlock>
   );
};

export default Categories;
```
→ Category component를 NavLink로 만들어준다.
<br>
<br>

```jsx
to={c.name === 'all' ? '/' : `/${c.name}`}
```
→ **to** 값이 **all**이면 /로 설정해주고, 나머지의 경우 **/카테고리 이름**으로 설정해준다.
<br>
<br>
<br>
<br>

## ❗️Issue
<img width="1396" alt="스크린샷 2022-01-06 오전 5 45 47" src="https://user-images.githubusercontent.com/80838501/148511486-741e8080-e5ec-4808-98a5-8fd5891c48b3.png">
<br>

**App.js**
```jsx
import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
   return (
      <Route path="/:category?" component={NewsPage} />
   );
};

export default App;
```
→ `<Route>`를 반드시 `<Routes>`로 감싸주자.
<br>
<br>

```jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
   return (
   	<Routes>
		<Route path="/:category?" component={NewsPage} />
	</Routes>
   );
};

export default App;
```
<br>
<br>

그래도 계속 빈 화면이 렌더링된다면, react-router-dom을 ver 5.2.0으로 downgrade하자..
```jsx
 npm i react-router-dom@5.2.0
```
<br>
<br>
<br>

## usePromise 커스텀 Hook 만들기
> 컴포넌트에서 API 호출처럼 Promise를 사용하는 경우 코드를 간결히 작성할 수 있게 해주는 커스텀 Hook을 만들어보자!

- 프로젝트의 다양한 곳에서 사용되는 유틸 함수들은 보통 src에 lib 디렉토리를 만들어 작성한다.
<br>

**usePromise.js**
```jsx
import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
   //대기 중/완료/실패에 대한 상태 관리
   const [loading, setLoading] = useState(false);
   const [resolved, setResolved] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      const process = async () => {
         setLoading(true);
         try {
            const resolved = await promiseCreator();
            setResolved(resolved);
         } catch (e) {
            setError(e);
         }
         setLoading(false);
      };
      process();
   }, deps);

   return [loading, resolved, error];
}
```
<br>

**NewsList.js**
```jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
   box-sizing: border-box;
   padding-bottom: 4rem;
   width: 768px;
   margin: 0 auto;
   margin-top: 2rem;
   @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
   }
`;

const NewsList = ({ category }) => {
   const [loading, response, error] = usePromise(() => {
      const query = category === 'all' ? '' : `&category=${category}`;
      return axios.get(
         `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=1234a5678b`
      );
   }, [category]);

   //대기 중일 때
   if (loading) {
      return <NewsListBlock>대기 중...</NewsListBlock>;
   }

   //아직 response 값이 설정되지 않았을 때
   if (!response) {
      return null;
   }

   //에러가 발생했을 때
   if (error) {
      return <NewsListBlock>에러 발생!</NewsListBlock>;
   }

   //response 값이 유효할 때
   const { articles } = response.data;
   return (
      <NewsListBlock>
         {articles.map((article) => (
            <NewsItem key={article.url} article={article} />
         ))}
      </NewsListBlock>
   );
};

export default NewsList;
```
→ `usePromise`를 사용하면 대기 중 상태 관리와 useEffect 설정을 직접하지 않아도 되므로, 코드가 훨씬 간결해진다.
→ 상태 관리와 useEffect 설정 등을 Hook에서 관리
