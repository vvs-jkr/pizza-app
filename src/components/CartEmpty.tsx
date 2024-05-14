import React from 'react'
import { Link } from 'react-router-dom'

import сartEmptyImg from '../assets/img/empty-cart.png'

const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={сartEmptyImg} />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
)

export default CartEmpty
