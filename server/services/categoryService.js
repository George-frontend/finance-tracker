import { supabase } from "../config/supabase.js";

export async function addCategory(userId, nameOfCategory, typeOfCategory) {
    
    const { data, error } = await supabase
    .from("categories")
    .select("name", "type")
    .eq("user_id", userId);

    if (error) throw new Error("Database error");

    if (data.some(el => el.name === nameOfCategory)) {
        throw new Error("This category already exists");
    }

    if (typeOfCategory !== "income" && typeOfCategory !== "expense") {
        throw new Error("Invalid input");
    }

    const { data: addedCategory, error: categoryError } = await supabase
        .from("categories")
        .insert({
            user_id: userId,
            name: nameOfCategory,
            type: typeOfCategory
        })
        .select()

    if (categoryError) throw new Error("Failed to add category");

    return addedCategory[0];
}; 