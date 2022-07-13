import {fetchAuto} from "../utils";
import {api} from "../../variables/links";

export async function getAccountInfo() {
  const user = await fetchAuto(`/users/@me`, {toJson: true})

  const guilds = await fetch(
      `${api}/guilds`,
      {
        credentials: "include"
      }
  );

  return {
    user,
    guilds: await guilds.json()
  };
}

export function bannerToUrl(id, hash) {
  return `https://cdn.discordapp.com/banners/${id}/${hash}?size=1024`;
}
export function avatarToUrl(id, hash) {
  return `https://cdn.discordapp.com/avatars/${id}/${hash}?size=512`;
}

export function iconToUrl(id, hash) {
  return `https://cdn.discordapp.com/icons/${id}/${hash}`;
}