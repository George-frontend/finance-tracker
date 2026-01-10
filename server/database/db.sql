-- Profiles Table

CREATE TABLE profiles (
  id uuid PRIMARY KEY
    REFERENCES auth.users(id) ON DELETE CASCADE,

  username text UNIQUE,

  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Trigger за auto-create profile
CREATE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Wallets Table

CREATE TABLE wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,

  amount numeric(10,2) NOT NULL DEFAULT 0,

  created_at timestamp DEFAULT now()
);

-- Transactions Table 

CREATE TABLE transactions (

  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- Generated unique identifier

  user_id = uuid NOT NULL
    REFERENCES auth.user_id(id) On DELETE CASCADE, -- Transaction to user 
  
  wallet_id uuid NOT NULL
    REFERENCES wallets(id) ON DELETE CASCADE, -- To wallet 

  amount numeric(12,2) NOT NULL
    CHECK (amount > 0), -- Transaction amount (positive)

  type text NOT NULL
    CHECK (type IN ('income', 'expense')), -- Transaction type

  created_at timestamp DEFAULT now()
)