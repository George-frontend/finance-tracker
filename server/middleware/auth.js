import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export const authenticate = async (req, res, next) => {
  try {
    // Get token from header Authorization: Bearer <token>
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    // Get user info от Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return res.status(401).json({ error: error.message });

    // Add user to req
    req.user = user;

    next(); // Next to middleware / route
  } catch (err) {
    next(err); // Giving to global error handler
  }
};


