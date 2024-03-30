import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import React, { useState } from 'react'

const Home = () => {
  const [items, setitems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    fetch('https://660864a1a2a5dd477b146fb6.mockapi.io/items')
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setitems(arr)
        setIsLoading(false)
      })
  }, [])
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  )
}

export default Home
