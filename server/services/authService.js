import { supabase } from "../config/supabase.js";

import bcrypt from "bcrypt";
import { createWallet } from "./walletService.js";

export async function checkUserByEmail(email) {

    const { data, error } = await supabase
        .from("users")       // select from the "users" table
        .select("*")         // select all columns
        .eq("email", email)  // filter where "email" equals the given email
        .limit(1);           // limit the result to 1 row

    if (error) throw new Error("Database error"); // throw an error if the query fails

    if (!data || data.length === 0) return null;

    return data[0]; // return the first row
};


export async function signUp(fullName, username, email, password) {
    const existingUser = await checkUserByEmail(email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase
        .from("users")
        .insert({
            full_name: fullName,
            username,
            email,
            password: hashedPassword
        })
        .select()
        .single(); 

    if (error) {
        throw new Error("Failed to create user");
    }

    const wallet = await createWallet(newUser.id);

    return { user: newUser, wallet };
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
};
