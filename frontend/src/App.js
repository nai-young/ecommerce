import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <Router>
      <div className="grid-cont">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">Shop Online</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">My Cart</Link>
            <a href="signin.html">Sign In</a>
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>X</button>
          <ul>
            <li>
              <a href="index.html">Pants</a>
            </li>
            <li>
              <a href="index.html">Shirts</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/product/:id" component={Product} />
            <Route path="/cart/:id?" component={Cart}/>
            <Route path="/" exact={true} component={Home} />
          </div>
        </main>
        <footer className="footer">
          All right reserved.
        </footer>
      </div>
    </Router>
  )
}

export default App;
