import axios from "axios";

export async function getAccessToken(): Promise<string> {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "ff307742-4394-43cf-87db-18585ada55a5",
        client_secret: "b76de015-a5a0-46d1-8ce8-22555bad88d8",
      }),
    };
  
    try {
      const response = await axios.post(
        "https://sso.omno.com/realms/omno/protocol/openid-connect/token",
        options.data,
        { headers: options.headers }
      );
  
      if (response.status !== 200) {
        throw new Error(`Error fetching access token: ${response.statusText}`);
      }
      return response.data.access_token;
    } catch (err) {
      console.error("Error fetching access token:", err);
      throw err;
    }
  }