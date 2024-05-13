import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import React from 'react'
import Pagination from '../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice.js'
import { Link } from 'react-router-dom'

import {
selectFilter,
  setCategoryId,
  setCurrentPage,
} from '../redux/slices/filterSlice'

const Home = () => {
  //   const navigate = useNavigate()
  const dispatch = useDispatch()
  //   const isMounted = React.useRef(false)

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter)

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    )
  }
  window.scrollTo(0, 0)

  React.useEffect(() => {
    if (!window.location.search) {
      fetchPizzas()
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  React.useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  const pizzas = items.map((obj) => (
    <Link to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ))
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
