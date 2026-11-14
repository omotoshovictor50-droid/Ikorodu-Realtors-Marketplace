export interface Realtor {
  id: string;
  name: string;
  initials: string;
  agency: string;
  verified: boolean;
  yearsActive: number;
  bio: string;
}

// Sample data — replace with real realtors from your database.
export const realtors: Realtor[] = [
  {"id": "1", "name": "Tunde Adebayo", "initials": "TA", "agency": "Adebayo & Co. Realty", "verified": true, "yearsActive": 9, "bio": "Helps families find homes and plots across Ikorodu."},
  {"id": "2", "name": "Funke Okafor", "initials": "FO", "agency": "Okafor & Co. Realty", "verified": true, "yearsActive": 15, "bio": "Focuses on new-build duplexes and estate properties."},
  {"id": "3", "name": "Chidi Nwosu", "initials": "CN", "agency": "Nwosu & Co. Realty", "verified": true, "yearsActive": 10, "bio": "Specialises in land and plots for first-time builders."},
  {"id": "4", "name": "Aisha Bello", "initials": "AB", "agency": "Bello & Co. Realty", "verified": true, "yearsActive": 15, "bio": "Handles apartments, shops and rental-ready properties."},
  {"id": "5", "name": "Kemi Ogunleye", "initials": "KO", "agency": "Ogunleye & Co. Realty", "verified": false, "yearsActive": 14, "bio": "Helps families find homes and plots across Ikorodu."},
  {"id": "6", "name": "Emeka Eze", "initials": "EE", "agency": "Eze & Co. Realty", "verified": true, "yearsActive": 9, "bio": "Focuses on new-build duplexes and estate properties."},
  {"id": "7", "name": "Ngozi Balogun", "initials": "NB", "agency": "Balogun & Co. Realty", "verified": true, "yearsActive": 9, "bio": "Specialises in land and plots for first-time builders."},
  {"id": "8", "name": "Seyi Salami", "initials": "SS", "agency": "Salami & Co. Realty", "verified": true, "yearsActive": 10, "bio": "Handles apartments, shops and rental-ready properties."},
  {"id": "9", "name": "Bisi Adeyemi", "initials": "BA", "agency": "Adeyemi & Co. Realty", "verified": true, "yearsActive": 15, "bio": "Helps families find homes and plots across Ikorodu."},
  {"id": "10", "name": "Yusuf Lawal", "initials": "YL", "agency": "Lawal & Co. Realty", "verified": false, "yearsActive": 11, "bio": "Focuses on new-build duplexes and estate properties."},
  {"id": "11", "name": "Amaka Obi", "initials": "AO", "agency": "Obi & Co. Realty", "verified": true, "yearsActive": 5, "bio": "Specialises in land and plots for first-time builders."},
  {"id": "12", "name": "Dayo Ajayi", "initials": "DA", "agency": "Ajayi & Co. Realty", "verified": true, "yearsActive": 4, "bio": "Handles apartments, shops and rental-ready properties."},
  {"id": "13", "name": "Halima Sani", "initials": "HS", "agency": "Sani & Co. Realty", "verified": true, "yearsActive": 14, "bio": "Helps families find homes and plots across Ikorodu."},
  {"id": "14", "name": "Ifeanyi Okonkwo", "initials": "IO", "agency": "Okonkwo & Co. Realty", "verified": true, "yearsActive": 10, "bio": "Focuses on new-build duplexes and estate properties."},
  {"id": "15", "name": "Lola Fashola", "initials": "LF", "agency": "Fashola & Co. Realty", "verified": false, "yearsActive": 9, "bio": "Specialises in land and plots for first-time builders."},
  {"id": "16", "name": "Musa Ibrahim", "initials": "MI", "agency": "Ibrahim & Co. Realty", "verified": true, "yearsActive": 12, "bio": "Handles apartments, shops and rental-ready properties."},
  {"id": "17", "name": "Folake Coker", "initials": "FC", "agency": "Coker & Co. Realty", "verified": true, "yearsActive": 11, "bio": "Helps families find homes and plots across Ikorodu."},
  {"id": "18", "name": "Segun Ojo", "initials": "SO", "agency": "Ojo & Co. Realty", "verified": true, "yearsActive": 14, "bio": "Focuses on new-build duplexes and estate properties."},
  {"id": "19", "name": "Tosin Akinola", "initials": "TA", "agency": "Akinola & Co. Realty", "verified": true, "yearsActive": 4, "bio": "Specialises in land and plots for first-time builders."},
  {"id": "20", "name": "Ibrahim Umar", "initials": "IU", "agency": "Umar & Co. Realty", "verified": false, "yearsActive": 3, "bio": "Handles apartments, shops and rental-ready properties."},
];
