alter table profiles enable row level security;

create policy "Users can manage own profile"
on profiles
for all
using (auth.uid() = id);

ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their wallet"
ON wallets
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create their wallet"
ON wallets
FOR INSERT
WITH CHECK (user_id = auth.uid());
