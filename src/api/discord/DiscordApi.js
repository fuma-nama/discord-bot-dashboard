import {api} from "variables/links";

export async function getAccountInfo() {
  const user = await fetch(`${api}/users/@me`)

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

  try {

    return {
      user: await user.json(),
      guilds: []
      //guilds: Array.from(await guilds.json()).filter((g) => g.owner),
    };
  } catch (e) {
    throw e;
  }
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