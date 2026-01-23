import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";


export async function checkUserByEmail(email) {

    const { data, error } = await supabase
        .from("users")       // select from the "users" table
        .select("*")         // select all columns
        .eq("email", email)  // filter where "email" equals the given email
        .limit(1);           // limit the result to 1 row

    if (error) throw new Error("Database error"); // throw an error if the query fails

    if (!data || data.length === 0) {
        return null; //  user not found
    }

    return data[0]; // return the first row if it exists
};


export async function signUp(fullName, email, password) {
    const existingUser = await checkUserByEmail(email); // Check if a user with the given email already exists

    if (existingUser) throw new Error("User already exists"); // Throw an error if user already exists

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it in the database

    const { data, error } = await supabase.from("users").insert({ // Insert the new user into the "users" table
        full_name: fullName,           // store the full name
        email,                         // store the email
        password: hashedPassword       // store the hashed password
    });

    if (error) throw new Error("Failed to create user"); // Throw an error if inserting the user failed

    return data[0]; // Return the first row of the inserted user
};


export async function signIn(email, password) {
    
    const existingUser = await checkUserByEmail(email); // Find user by email

    if (!existingUser) {
        throw new Error("User not found");
    }

     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
        throw new Error("Incorrect password"); 
    }

    return existingUser;

}
