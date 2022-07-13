import {fetchAuto} from "../utils";

export async function getAccountInfo() {
  const user = await fetchAuto(`/users/@me`, {toJson: true})

  /*
  const guilds = await fetch(
      "https://discordapp.com/api/users/@me/guilds",
      {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      }
  );
   */

  return {
    user,
    guilds: [
      {
        "icon": "d7438912f61e7cf6c9178f2c32691631",
        "owner": true,
        id: "600363644991176822",
        name: "Kanecord Cosplay Community",
      }
    ]
    //guilds: Array.from(await guilds.json()).filter((g) => g.owner),
  };
}

export function bannerToUrl(id, hash) {
  return `https://cdn.discordapp.com/banners/${id}/${hash}`;
}
export function avatarToUrl(id, hash) {
  return `https://cdn.discordapp.com/avatars/${id}/${hash}`;
}

export function iconToUrl(id, hash) {
  return `https://cdn.discordapp.com/icons/${id}/${hash}`;
}