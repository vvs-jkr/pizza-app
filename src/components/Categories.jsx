import { useState } from 'react'

function Categories({ value, onChangeCategory }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегитарианские',
    'Гриль',
    'Острые',
    'Бездрожжевые',
  ]

  //   const onClickCategory = (index) => {
  //     setActiveIndex(index)
  //   }

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={value === i ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
