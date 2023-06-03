import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.spoonacular.com/",
  params: {



    apiKey: "0c5f3f8b1829441293288f354bb28d3a",


  },
});


// api keys för att använda
//efter 150 calls/dag så måste man byta
// 1:   964c5387d5614f48bcbda8866afc48a2
// 2:   156aa0bc470e4115bfb88ecc406a00d7
// 3:   1c912f6c288a41568924bbcc9f8847f0
// 4:   9e579d1b206748fabefa51eb26d26604
// 5:   3b5cbd4ebf054a5c986eb9d8d756e2f5
// 6:   9d3be36d827646239b4755f66d013399
// 7:   7105718fe0b84caa9a7f676abbc3be09
// 8:   f70fe201487b4e8580503bedcc5cde60
// 9:   9c6921e4368747bb8f064e9278b5b106


//Länken får endast användas vid presentation!

//9c6921e4368747bb8f064e9278b5b106