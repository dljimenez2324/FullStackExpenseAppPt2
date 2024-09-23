
import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constant";
import ExpenseForm from "./ExpenseForm";
import ExpenseFilter from "./ExpenseFilter";
import ExpenseList from "./ExpenseList";
import { Expense } from "../../Interfaces/interface";
import { useNavigate } from "react-router-dom";
import { checkToken, GetExpensesByUserId, LoggedInData } from "../../Services/DataService";




const HomeComponent = () => {


  // useStates created to hold Expense Array and selected category from the form select and filter
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState<Expense[]>([]);
  // const [data, setData] = useState<Expense[]>([{ id:0, userId: userId, description: "", amount: 0, category: "" }]);


  // per discussion with Neng, we see that visibleExpense isnt needed as its already handled with ExpenseFilter.tsx
  // then discussion with Neo, Jose and Jacob, we found we could still use this to pass in our filtered data so that our table will filter out unselected categories or keep all
  // notice that the filter below will return only data that has the selected category  (see how this is different where we use !== which will return everything that is not the category)
  const visibleExpense = selectedCategory
    ? data.filter((e:any) => e.category === selectedCategory)
    : data;

  // Get all Expense api function  need to change to getitemsbyuserid and pass in the userId  and fetchAllExpenses needs to pass in a parameter of userid:number
  const fetchAllExpenses = () => {
    axios
      .get(`${BASE_URL}GetAllExpenses`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        if (error instanceof CanceledError) {
          console.log("Request was canceled");
        } else {
          console.log("The error is " + error.message);
          setError(error);
        }
      });
    console.log(`All Data: ${data}`);
    console.log('Current Errors Stored in error from fetchAllExpenses: ', error)
  };

  // delete function
  const handleDelete = (id: number) => {
    axios
      .delete(`${BASE_URL}Delete/${id}`)
      .then(() => {
        setData(data.filter((expense) => expense.id !== id));
        fetchAllExpenses();
      })
      .catch((error) => {
        console.log(error);
      });
    
  };



  // navigate to Login just in case user has tried to see expenses without logging in
  let navigate = useNavigate();
  
  // loads upon mount              ------------------ need to uncomment line 76 , 80 and lines 86 to 104 to continue working on this
  useEffect(() => {
      if(!checkToken())
      {
        // navigate('/');
      } 
      else 
      {
        // loadUserData();
      }
  
    
  }, [])
  
  //-------------- will need to change this below to match my usecased and copied from Jose's lecture FullStackBlog from Dashboard       fix Expense form first------------------
  // // load userData by grabbing information from both LoggedInData method to get the userId # and use it as a parameter for GetExpensesByUserId method
  // const loadUserData = async () => {
  //   let userInfo = LoggedInData();
  //   // onLogin(userInfo);
  //   setUserId(userInfo.userId);
  //   setUserName(userInfo.userName);
  //   console.log("userInfo: ", userInfo);
  //   let userExpenseItems = await GetExpensesByUserId(userInfo.userId);
  //   setData(userExpenseItems.data)

  //   // setTimeout(async () => {
  //   //   let userBlogItems = await GetExpensesByUserId(userInfo.userId);
  //   //   setBlogItems(userBlogItems);
  //   //   setUserId(userId);
  //   //   setIsLoading(false);
  //   //   console.log("Loaded blog items: ", userBlogItems);
  //   // }, 1000);
  // };


  // // useEffect to fun an api call for the fetch all data
  // useEffect(() => {
  //   fetchAllExpenses();
  // }, []);

  return (
    <>
        <div className="container mainCont">
          <h1 className="text-center my-5">Expense App for {}</h1>
          <div className="container">
            <div className="container my-4 mx-4 flexCont">
              <div className="container formCont col-4">
                <h2 className="text-center">New Expense</h2>
                <div className="m-4 formStyle">
                  <ExpenseForm fetchExpenses={fetchAllExpenses} />
                  {/* Component below was commented out due to addedData stating not having the proper props in the data */}
                  {/* <ExpenseForm addedData={data} fetchExpenses={fetchAllExpenses} /> */} 

                </div>
                <h4 className="m-4">Selected Category</h4>
                <div className="m-4 ms-4">
                  <ExpenseFilter
                    onSelectedCategory={(category) =>
                      setSelectedCategory(category)
                    }
                    />
                </div>
              </div>
              <div className="container">
                <div className="col">
                  <h2 className="text-center expenseMargin">Expense Table</h2>
                  <div className="m-4">
                    <ExpenseList
                      expenses={visibleExpense}
                      onDelete={handleDelete}
                      fetchData={fetchAllExpenses}
                      category={selectedCategory}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default HomeComponent;
