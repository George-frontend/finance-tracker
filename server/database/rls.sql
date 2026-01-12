-- Enable Row Level Security on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view and update only their own profile
CREATE POLICY "Users can manage own profile"
ON profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Enable Row Level Security on wallets
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Users can view only their own wallets
CREATE POLICY "Users can view their wallets"
ON wallets
FOR SELECT
USING (user_id = auth.uid());

-- Users can create wallets only for themselves
CREATE POLICY "Users can create their wallets"
ON wallets
FOR INSERT
WITH CHECK (user_id = auth.uid());

-- Users can update and delete only their own wallets
CREATE POLICY "Users can manage their wallets"
ON wallets
FOR UPDATE, DELETE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Enable Row Level Security on transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Users can view, create, update and delete only their own transactions
CREATE POLICY "Users can manage their own transactions"
ON transactions
FOR ALL
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
