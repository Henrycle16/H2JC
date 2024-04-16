import axios from "axios";

//Get User by ID
export const brandSignUp = async (formData: object) => {
 //const body = JSON.stringify({ formData });

 console.log("STRINGIFY: ", formData);

 try {
   const res = await axios.post("http://localhost:5000/api/brands", formData, {
     headers: {
       "Content-Type": "application/json",
     },
   });

   console.log("Brand Created: ");
   console.log(res.data);
   return res.data;
 } catch (err: unknown) {
   if (typeof err === "string") {
     console.log(err.toUpperCase()); // works, `e` narrowed to string
   } else if (err instanceof Error) {
     console.log(err.message); // works, `e` narrowed to Error
   } else if (err && typeof err === "object" && "message" in err) {
     console.log(err.message);
   }
 }
};