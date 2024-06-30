import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <a href="/">Fast CarPark</a>
      </h1>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/favorites">Favorites</a>
          </li>
          <li className="nav-item">
            <a href="/basket">Basket</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
