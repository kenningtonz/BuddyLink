import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jdacvrjcjpwgzttdvxle.supabase.co";
const supabaseAnonKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkYWN2cmpjanB3Z3p0dGR2eGxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxODM2MTcsImV4cCI6MjAyNzc1OTYxN30.XIGCrKa_r1Akm1b6x61xgGFnt0bO9mF-lcPbZWvegu4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage: AsyncStorage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
