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


// method to get logged in users username and userId # and set it to local storage
    const FetchLoggedInUser = async (username: string) => {
        // console.log(username);
        await axios
            .get(BASE_USERURL + "GetUserByUserNameDTO/" + username)
            .then(res => {
                userData = res.data; //store userData from response
                localStorage.setItem("UserData", JSON.stringify(userData)); //set userData to the key UserData

                // check to see if local storage is empty so JSON.parse does now throw an error as it cannot be null as line 7 currently shows userData as empty
                const storedData = localStorage.getItem("UserData");
                if(storedData)
                {
                    userData = JSON.parse(storedData);  
                    console.log("UserData from localStorage in FetchLoggedInUser in DataService: ", userData);
                } else 
                    {
                        console.error("No UserData found in localStorage");
                    }
            })
            .catch(error => console.error("Error fetching user data: ", error.message));
            
    }


// method to get expenses by userId
    const GetExpensesByUserId = async (userId: number) => {
        let expenseData;
        await axios
            .get(BASE_USERURL + "GetExpensesByUserId/" + userId)
            .then((res) => {
                expenseData = res.data;
            })
            .catch(error => console.error("Error fetching expenses by useId: ", error.message));

        return expenseData
    }


// method to get userData if its empty or not
    const LoggedInData = () => {
        if ((!userData || Object.keys(userData).length === 0) && localStorage.getItem("UserData"))  // check if userData is undefined or empty and if localStorage has UserData
        {
            userData = JSON.parse(localStorage.getItem("UserData") || '{}'); // Safely parse from localStorage by giving JSON.parse and empty object {} in the event there is nothing in local storage
        }
        return userData;
    }

export { LoginUser, FetchLoggedInUser, createAccount, checkToken, GetExpensesByUserId, LoggedInData }