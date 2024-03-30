import { useState } from 'react'

function Categories() {
  const [activeindex, setActiveIndex] = useState(0)

  const categories = [
    'Все',
    'Мясные',
    'Вегитарианские',
    'Гриль',
    'Острые',
    'Бездрожжевые',
  ]

  const onClickCategory = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={activeindex === i ? 'active' : ''}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
