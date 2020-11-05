import React, { useEffect,useState,useRef,useCallback } from "react";
import News from '../../components/News';
import { Header } from 'semantic-ui-react'

export default function Home (){
  useEffect(() => {
    setPageNumber(1)
  })
  const [query,setQuery] = useState('')
  const [pageNumber,setPageNumber] = useState(1)
  const {
    news, 
    hasMore,
    loading,
    error
  } =  News(query,pageNumber)
  const observer = useRef()
  const lastNewElementRef = useCallback(node => {
    if(loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        console.log('Visible');
        setPageNumber(prevPageNumber => prevPageNumber + 1)
        console.log(pageNumber);
      }
    })
    if(node) observer.current.observe(node)

  }, [loading, hasMore])

  function handleNews(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return(
    <>
    <Header as='h1'>Break News</Header>
    <div class="news-wrap">
    {news.map((newitem, index) => {
      if(news.length === index +1){
        return <div ref={lastNewElementRef} key={newitem}>{newitem}</div>
      }else{
        return <div key={newitem}>{newitem}</div>
      }
      })}
    </div>

      <div>{loading && 'Loading...'}</div>
      <div>{error && 'Você atingiu o máximo de notícias disponíveis'}</div>
    </>
  )
}

