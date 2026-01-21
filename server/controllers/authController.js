import { signUp, signIn } from "../services/authService"

export async function register(req, res) {
    
    const { fullName, email, password} = req.body

    try { 
        const user = await signUp(fullName, email, password);
        res.status(201).json({ user }); // return created user
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