import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://atagrsvkgqrizzanyymv.supabase.co";
const supabaseKey = "sb_publishable_VPmKuQrgovBJJfOniAfPIg_kYUFMUBK";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

