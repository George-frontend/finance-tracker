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

export async function deleteCategory(categoryId, userId) {
    
    const { data: category, error} = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single();

    if (error || !category) {
        throw new Error("Category not found");
    }

    if (category.user_id !== userId) {
        throw new Error("Unauthorized");
    }

    const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .eq("category_id", categoryId);

    if (transactions.length > 0) {
        throw new Error("Cannot delete category with existing transactions");
    }

    const {data: deletedCategory, error: deleteError} = await supabase
        .from("categories")
        .delete()
        .eq("id", categoryId)
        .select();

    if (deleteError) {
        throw new Error("Failed to delete category");
    }

    return deletedCategory[0];
};