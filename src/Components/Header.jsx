import React, { useEffect ,useState} from 'react';
import { useNavigate ,Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth' ;
import { auth } from './FirebaseConfig';
import languagesText from '../api/Language';

const Header = ({lang , setLang}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
      })
      return ()=>unsubscribe();
    },[]);

    //Logout
    const logOutHandler = async () =>{
      if(location.pathname === '/dashboard'){
         await signOut(auth);
         navigate('/');
      }else {
        navigate('/login')   
      }  
    };

    const showLogout = location.pathname === '/dashboard';
  
  return (
     <header className="topNav">
  <nav className="navbar navbar-dark">
    <div className="container-fluid header-container">

      {/* LOGO */}
      <Link className="navbar-brand" to="/">
        <img
          className="nav__logo"
          src="https://www.freepnglogos.com/uploads/netflix-logo-0.png"
          alt="Netflix"
        />
      </Link>

      {/* RIGHT ACTIONS */}
      <div className="header-actions">

        {/* Search ONLY on dashboard */}
        {location.pathname === "/dashboard" && (
          <button
            className="search-btn"
            onClick={() => navigate("/search")}
          >
            🔍
          </button>
        )}

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="lang-select"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <button className="btn btn-danger" onClick={logOutHandler}>
          {showLogout
            ? languagesText[lang].logout
            : languagesText[lang].signIn}
        </button>
      </div>

    </div>
  </nav>
</header>

  )
}

export default Header            