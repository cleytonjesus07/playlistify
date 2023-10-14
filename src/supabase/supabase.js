import { createClient } from "@supabase/supabase-js";

export const sbDB = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);



