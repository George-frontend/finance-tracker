import { signUp, signIn } from "../services/authService.js"

export async function register(req, res) {
    
    const { fullName, username, email, password} = req.body

    try { 
        const { user, wallet } = await signUp(fullName, username, email, password);
        res.status(201).json({ user, wallet }); // return created user
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export async function login(req, res) {
    
    const { email, password } = req.body;

    try {
        const user = await signIn(email, password); 
        res.status(200).json({ user }); // return user on success
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};