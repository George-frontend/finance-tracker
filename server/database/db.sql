-- Enum type for category classification
CREATE TYPE category_type AS ENUM ('income', 'expense');

-- Profiles table
-- Stores additional user-related data linked to auth.users
CREATE TABLE profiles (
  id uuid PRIMARY KEY
    REFERENCES auth.users(id) ON DELETE CASCADE,

  username text UNIQUE,

  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

-- Function to automatically create a profile
-- whenever a new user is added to auth.users
CREATE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger that calls the profile creation function
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();

-- Wallets table
CREATE TABLE public.wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  currency text NOT NULL
    CHECK (currency IN ('EUR', 'USD')),

  balance numeric(12,2) NOT NULL DEFAULT 0,

  is_default boolean DEFAULT true,

  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now(),

  CONSTRAINT one_wallet_per_user UNIQUE (user_id)
);

-- Categories table
-- Defines income and expense categories per user
CREATE TABLE categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,

  name text NOT NULL,            -- e.g. Food, Transport, Salary
  type category_type NOT NULL,   -- income or expense

  created_at timestamp DEFAULT now(),

  -- Prevent duplicate category names per type for the same user
  UNIQUE (user_id, name, type)
);

-- Transactions table
-- Stores financial operations linked to wallets and categories
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,

  wallet_id uuid NOT NULL
    REFERENCES wallets(id) ON DELETE CASCADE,

  category_id uuid NOT NULL
    REFERENCES categories(id) ON DELETE RESTRICT,

  amount numeric(12,2) NOT NULL
    CHECK (amount > 0),

  description text,              -- Optional user description

  transaction_date date NOT NULL DEFAULT CURRENT_DATE,

  created_at timestamp DEFAULT now()
);
