-- Profiles Table

CREATE TABLE profiles (
  id uuid PRIMARY KEY
    REFERENCES auth.users(id) ON DELETE CASCADE,

  username text UNIQUE,

  created_at timestamp default now(),
  updated_at timestamp default now()
);

-- Trigger for auto-create profile
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

  user_id uuid UNIQUE
    REFERENCES auth.users(id)
    ON DELETE CASCADE,

  currency text NOT NULL
    CHECK (currency IN ('EUR', 'USD')),

  balance numeric(12,2) NOT NULL DEFAULT 0,

  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
)