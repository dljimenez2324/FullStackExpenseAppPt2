
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createAccount } from "../../Services/DataService"


const CreateAccount = () => {

  // useStates and use of navigation
    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
  // helper function for creating an account used in the submit button  typically I would use zod validation but for now and the sake of time, I'm excluding zod as I dont have time now.  I must come back to add this
    const handleCreate = (e: React.FormEvent) => {

        e.preventDefault();  // Prevent devault form submission
        let userInfo = {
          id:0,
          username: username,
          password: password
        };

        createAccount(userInfo);
        console.log(userInfo);
        navigate('/');
    }
  

  return (
    <>
        <div className="container-parent ">
          <div className="row">
            <div className="col">
              <div className="container-form">
              <h1 className="text-center mb-4">Create Account</h1>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter a username" onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Enter a password" onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                  <button type="submit" className="btn btn-primary me-2" onClick={handleCreate}>Submit</button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default CreateAccount