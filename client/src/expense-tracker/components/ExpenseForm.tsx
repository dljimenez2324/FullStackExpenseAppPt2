import categories from "../categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Expense } from "../../Interfaces/interface";


// in order to use zod we need to make our schema
const schema = z
  .object({
    // note that id was   id: z.number(),    before change to nanoid
    id: z.number().default(0),
    // id: z.number(),
    description: z.string().min(3, { message: "Need at least 3 letters" }),
    amount: z.number(),
    category: z.string(),
  })
  .refine((data) => data.category !== "Select a Category", {
    message: "Pick a Category",
    path: ["category"],
  });

// lets create a type alias that represents the shape of the data defined by our schema above so that we check for type when we get or form data
type FormData = z.infer<typeof schema>;

// // we need to pass through our FormData into our Expense form so that when we use it in the HomeComponent.tsx it will ask for the prop to be used and this is
interface ExpenseProps {
  // onHelpSubmit: (data:FormData) => void;
  fetchExpenses: () => void;
  userId: number; // removed the ? after userId possibly as it would make inputData throw possible undefined error in userId: userId.userId;  TRIED BUT DIDNT WORK in HomeComponent
}


// onHelpSubmit,        was originally in the props passed through
const ExpenseForm = ({ fetchExpenses, userId }: ExpenseProps) => {
  // in order to validate our form data on submit we need the following
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // useStates for holding the current data from our inputs
  const [inputData, setInputData] = useState({
    id: 0,
    userId: userId,
    description: "",
    amount: 0,
    category: "",
  });

  // // helper function for adding expenses
  // const addExpense = async () => {
  //   await axios
  //     .post(`${BASE_URL}AddExpense`, inputData)
  //     .then((response) => {
  //       console.log(response);
  //       fetchExpenses();
  //     })
  //     .catch((error) => console.log(error));
      
  // };
  // Helper function for adding expenses but now with the userId taken into account
  const fetchData = async () => {
    try {
      console.log(inputData);
      const response = await axios.post(`${BASE_URL}AddExpense`, inputData);
      const data = response.data;
      // Do something with the data
      console.log(data);
      fetchExpenses();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(fetchData)}>
        {/* hidden input so that form still takes in a value for the form to pass submission requirements */}
        {/* <input type="hidden" {...register('id')} value={id}/> */}
        <div className="col mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            placeholder="Expense Name"
            className="form-control"
            onChange={(e) =>
              setInputData({ ...inputData, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            placeholder="$0.00"
            className="form-control"
            onChange={(e) => setInputData({...inputData, amount: parseInt(e.target.value)})}
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>

        <div className="col mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            name="category"
            className="form-select"
            onChange={(e) => setInputData({...inputData, category: e.target.value})}
          >
            <option>Select a Category</option>
            {/* this map makes the options show in the select category field  notice the callback function */}
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {/* error for category shows below the select field */}
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>

        {/* <button className="btn btn-outline-primary mt-1" onClick={incrementID}>Submit</button> */}
        <button className="btn btn-outline-warning mt-1" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ExpenseForm;
