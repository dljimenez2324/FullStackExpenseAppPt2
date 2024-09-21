import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { LoginUser, FetchLoggedInUser } from "../../Services/DataService";


const Login = () => {

    let navigate = useNavigate();
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // working with Jacob, Neo and I saw that we could create this function using an async function
    const handleLogin = async () => {
      
      let userData = {
        id: 0,
        username: username,
        password: password
      }

      let token = await LoginUser(userData);
      console.log(userData);
      console.log("The login token is:  ", token);
      if(token != null) {
        localStorage.setItem("Token", token);
        FetchLoggedInUser(username);
        navigate('/HomeComponent');
      }
      return userData;

    }

  return (
    <>
      {/* <div className="container d-flex align-self-center"> */}

        <div className="container-parent ">
          <div className="row">
            <div className="col">
              <div className="container-form">
              <h1 className="text-center mb-4">Login</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username1" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password1" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                  <button type="submit" className="btn btn-primary me-2" onClick={handleLogin}>Submit</button>
                  <button type="button" className="btn btn-success ms-2" onClick={() => ('/CreateAccount')}>Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
        
        
    </>
  )
}

export default Login


