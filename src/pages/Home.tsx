import Categories from '../components/Categories'
import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Skeleton from '../components/PizzaBlock/Skeleton'
import React from 'react'
import Pagination from '../components/Pagination'
import { useSelector } from 'react-redux'
import { selectFilter } from '../redux/filter/selectors'
import { useAppDispatch } from '../redux/store'
import { selectPizzaData } from '../redux/pizza/selectors'
import { setCategoryId, setCurrentPage } from '../redux/filter/slice'
import { fetchPizzas } from '../redux/pizza/asyncActions'

const Home: React.FC = () => {
  const dispatch = useAppDispatch()

  const { items, status } = useSelector(selectPizzaData)
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter)

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    )
  }
  window.scrollTo(0, 0)

  //   React.useEffect(() => {
  //     if (!window.location.search) {
  //       dispatch(fetchPizzas({} as SearchPizzaParams))
  //     }
  //   }, [categoryId, sort.sortProperty, searchValue, currentPage])

  React.useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  //   React.useEffect(() => {
  //     if (window.location.search) {
  //       const params = qs.parse(
  //         window.location.search.substring(1)
  //       ) as unknown as SearchPizzaParams
  //       const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
  //       dispatch(
  //         setFilters({
  //           searchValue: params.search,
  //           categoryId: Number(params.category),
  //           currentPage: Number(params.currentPage),
  //           sort: sort || sortList[0],
  //         })
  //       )
  //     }
  //   })

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
          getCategories={() => {}}
        />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
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
