import axios from "axios";
import { UserCreate, UserLogin } from "../Interfaces/interface"; // holds interface with username and password without id
import { BASE_USERURL } from "../expense-tracker/constant";


// --- This will save the UserData info from local storage using the key UserData which was set by the localStorage.setItem() in the GetLoggedInUser method
    let userData = {};
    if (localStorage.getItem("UserData")) {
        userData = JSON.parse(localStorage.getItem("UserData")!) // again we found from Jacob, adding ! to the end of the JSON.parse() means we're telling it to trust it will have data
    }


// helper function to check our token in our local storage 
    const checkToken = () => {
        let result = false;
        let lsData = localStorage.getItem("Token");

        if(lsData && lsData != null)
        {
            result = true;
        }
        
        return result;
    }


// function to help create a user account.  hopefully the API will automatically add an ID# to the user as it takes in id:0 in the backend.  but im not sure THIS MAY PRODUCE ERRORS WHEN CREATING A USER.  ID # (id:0) is added by the helper function to ensure the UserCreate interface is given every key:value pair and back end will auto-increment the id#
const createAccount = async (createUser: UserCreate) => {
    await axios
        .post(BASE_USERURL + "AddUser", createUser )
        .then(response => response.data)
        .catch(error => error.message)
  }


// method to login a user using a POST in one of our API's endpoints and setting the token it gives to our local storage and returns our datas token as well
    const LoginUser = async (user:UserLogin) => {
        let userToken = "";

        try {
            const result = await axios.post(BASE_USERURL + "Login", user);
            let data = result.data;
            userToken = data.token;
            localStorage.setItem("Token", data.token);
            console.log(localStorage);
            console.log(result);

        } catch (error) {
            console.log(error);
        }
        return userToken
    }


// method to get logged in user 
    const FetchLoggedInUser = (username: string) => {
        console.log(username)
        throw new Error("Function not implemented.");
    }


export { LoginUser, FetchLoggedInUser, createAccount, checkToken }