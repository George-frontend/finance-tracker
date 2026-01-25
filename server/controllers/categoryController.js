import { addCategory, deleteCategory } from "../services/categoryService.js"

export async function addCategoryController(req, res) {
    
    try {
        const { userId, nameOfCategory, typeOfCategory } = req.body;

        const category = await addCategory(userId, nameOfCategory, typeOfCategory);

        res.status(201).json(category);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function deleteCategoryController(req, res) {
    
    try {
        
        const { categoryId, userId } = req.body;
        
        const deletedCategory = await deleteCategory(categoryId, userId);
        
        res.status(200).json(deletedCategory);

    } catch (error) {
        res.status(400).json({ error: err.message });
    }
}