import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = React.useState()
  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://660864a1a2a5dd477b146fb6.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Ошибка при получении')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return 'Загрузка'
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  )
}

export default FullPizza
