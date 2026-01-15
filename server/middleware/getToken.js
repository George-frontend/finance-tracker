// getToken.js
import { createClient } from "@supabase/supabase-js";

// 1️⃣ Замени с твоите стойности от Supabase
const supabaseUrl = "https://ipuafkgnutajlpxpqewf.supabase.co";          // Supabase Settings → API → URL
const supabaseAnonKey = "sb_publishable_V7tmd9XIFF20DHwGyiyKPQ_id1OQP1-"; // Supabase Settings → API → anon/public key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function getToken() {
  try {
    // 2️⃣ Логин с имейл и парола на твоя тестов потребител
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "georgegulubov@gmail.com", // промени на твоя имейл
      password: "Tomaka/321"       // промени на твоята парола
    });

    if (error) {
      console.error("Login error:", error.message);
      return;
    }

    // 3️⃣ Покажи информация за потребителя и access token
    console.log("User info:", data.user);
    console.log("Access token:", data.session.access_token);
  } catch (err) {
    console.error("Unexpected error:", err.message);
  }
}

// Стартираме функцията
getToken();
