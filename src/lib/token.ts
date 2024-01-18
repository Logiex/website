import axios from "axios";

const accessTokenLoc = "PollAuth";
const refreshTokenLoc = "PollAuthRefresh";
async function authWithServer(): Promise<string> {
  const data = (
    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL!}/auth/register`)
  ).data;
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;
  localStorage.setItem(accessTokenLoc, accessToken);
  localStorage.setItem(refreshTokenLoc, refreshToken);

  return accessToken;
}

export async function getToken() {
  let access = localStorage.getItem(accessTokenLoc);
  if (!access) {
    access = await authWithServer();
  }
  return access;
}

async function sendRefreshToken() {
  const refresh_token = localStorage.getItem(refreshTokenLoc);
  if (refresh_token) {
    const data = (
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL!}/auth/refresh`, {
        refresh_token: refresh_token,
      })
    ).data;
    console.log(data.data);
    
    if (data.refresh_token) {
      console.log("setting refresh token");
      
      localStorage.setItem(refreshTokenLoc, data.refresh_token);
    }

    console.log("setting access token");
    localStorage.setItem(accessTokenLoc, data.access_token);

    return data.access_token as string;
  } else {
    throw new Error("Something is wrong");
  }
}
export async function refreshToken() {
  return await sendRefreshToken();
}
