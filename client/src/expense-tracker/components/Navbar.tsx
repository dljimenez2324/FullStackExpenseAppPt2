import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/expense-list">Expense Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link" to="/CreateAccount">Create Account</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Login">Log In</Link>
                    </li>
                </ul>
                {/* <span className="navbar-text">
                    Navbar text with an inline element
                </span> */}
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar