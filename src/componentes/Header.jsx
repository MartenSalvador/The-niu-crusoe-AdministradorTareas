import '../estilos/Header.css';
import logo from '../assets/logo.png'; 

function Header() {
    return (
        <header className="header">
            <img src={logo } className='header-logo' alt='Logo The Niu Crusoe Bremen'/>
            <h1 className="header__titulo">Tareas</h1>

        </header>
    );
}

export default Header;


