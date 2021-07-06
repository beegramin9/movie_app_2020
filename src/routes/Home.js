/* 라우팅: 메인 페이지를 보여주는 파일 */
import React, { useLayoutEffect } from "react";
import './Home.css';
import Movie from '../components/Movie/Movie';
import { useAxios } from "../hooks/useAxios";
import { usePagination } from "../hooks/usePagination";
import { Section } from "../styles/GlobalComponents/SectionStyle";
import ReactPaginate from "react-paginate";

/* hook은 항상 최상위에 있어야 하니까 이걸 working하게 만드려면 파일을 나눠야 한다 */
function Home() {
  const URL = "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
 
  const  {isFullyLoaded, fetchedData, error} = useAxios(URL)
  if (isFullyLoaded) {
    const {data: {data: {movies : totalMovieList}}}= fetchedData
    const {currentMovieList, totalCountOfPage, changePage} = usePagination(totalMovieList);
    /* <ReactPaginate 
        previousLabel={"<<"}  
        nextLabel={">>"}
        pageCount={totalCountOfPage}
        onPageChange={changePage}
        containerClassName={"paginationButtion"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"paginationDiabled"}
        activeClassName={"paginationActive"}/> */

    return (
      <Section grid row>
        {currentMovieList.map(movie => {
          return <Movie 
          key={movie.id} 
          id={movie.id} 
          year={movie.year} 
          title={movie.title} 
          summary={movie.summary} 
          genres={movie.genres} 
          poster={movie.medium_cover_image} />
        })}
        <ReactPaginate 
        previousLabel={"<<"}  
        nextLabel={">>"}
        pageCount={totalCountOfPage}
        onPageChange={changePage}
        containerClassName={"paginationButtion"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        disabledClassName={"paginationDiabled"}
        activeClassName={"paginationActive"}/>
      </Section>
    )
  }
  
  return (
    <Section>
          Loading...
    </Section>
  )
}
/* {arrayOfMovieData.map(movie => {
  return <Movie 
  key={movie.id} 
  id={movie.id} 
  year={movie.year} 
  title={movie.title} 
  summary={movie.summary} 
  genres={movie.genres} 
  poster={movie.medium_cover_image} />
})} */


// class Home extends React.Component {
//   state = {
//     /* App이 실행(Mount)됨을 알리기 위해 isLoading이란 변수 */
//     isLoading : true,
//     /* 근데 state에 추가하지 않고 나중에 setState에서 추가해도 오류나지 않는다. */
//     movies: []
//   }
//   /* 맨 처음 호출될 때
//   render와 lifecylce은 다른 메소드니까 render 밖에 작성해야 함 */
//   /* 함수 이런식으로 쓰는것도 ES6 */
// 
//   /* 비동기. wait for axios! ES6라고 하는데 nodeJS랑 똑같네
//   await 쓰려면 함수 앞에 async 써야 함 */
//   getMovies = async () => {
//     const URL = "https://yts.mx/api/v2/list_movies.json?sort_by=rating "
//     // const movies = await axios.get(URL)
//     // console.log(movies.data.data.movies);
//     /* 원래 데이터 형태
//     movies = {
//       data: {data: {movies: {'const에 들어갈 원하는 정보'} } }
//     } */
// 
// 
//     const {data: {data: { movies }}} = await axios.get(URL)
//     /* 원래는 {data: {data: { movies }}} = movies 인 거야
//     원래는 movies : movies 인데 같으니까 movies으로만 써도 되는 것
//      */
//     console.log(movies);
//     /* movies 안의 movie들을 state 안의 movie array에 넣을 것 */
//     this.setState({movies : movies, isLoading : false})
//     /* 앞에껀 state에 있는 movies array, 뒤에껀 url로 받아온 것 */
//     /* {} 껍질 벗길 수 있다그랬지? 게다가 여긴 변수이름도 똑같으니 
//     this.setState({{movies}}) 로 사용가능
//     */
//     console.log(this.state.movies);
// 
//   }
//   componentDidMount() {
//     /* render가 처음 실행될 때 data를 fetch함. 보통 fetch()를 사용하긴 하는데
//     axios() 사용할거임
//     data 가져오는게 완료됐으면 그 데이터를 render할 거임 */
//     this.getMovies()
//   }
// 
// 
//   render () {
//     const {isLoading, movies} = this.state
//     /* return 안의 괄호 안 코드는 JS 코드라 그랬지?
//     근데 this.state 계속 써야하나? 귀찮노 */
//     /* object 해체하는 방법임
//     아마 state에 isLoading 하나밖에 없기 때문에 가능한 것으로 보임 
//     변수를 설정하려면 당연히 return 밖에서 해야겠지 */
// 
// 
//     /* html의 class와 JS의 class가 겹치기 때문에 className 
//     html의 for(label)과 JS의 for(반복문)이 겹치기 때문에 htmlfor*/
//     return (
//       <Section>
// 
//       <section className="container">
//         {isLoading ? 
//         <div className="loader">
//           <span className="loader__txt">Loading...</span>
//         </div>:
// 
// <div className="movies">
//           {movies.map(movie => {
//             return <Movie 
//             /* key 요소가 있어야 한대 */
//             key={movie.id} 
//             id={movie.id} 
//             year={movie.year} 
//             title={movie.title} 
//             summary={movie.summary} 
//             genres={movie.genres} 
//             poster={movie.medium_cover_image} />
//           })}
//         </div>
//         }
//       </section>
//       </Section>
//     )
//   }  
// }

export default Home;