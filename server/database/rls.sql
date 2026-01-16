-- Enable Row Level Security on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can view and update only their own profile
CREATE POLICY "Users can manage own profile"
ON profiles
FOR ALL
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their wallets"
ON public.wallets
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their wallets"
ON public.wallets
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can manage their wallets"
ON public.wallets
FOR UPDATE, DELETE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Enable Row Level Security on transactions
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their transactions"
ON public.transactions
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create transactions"
ON public.transactions
FOR INSERT
WITH CHECK (user_id = auth.uid());

