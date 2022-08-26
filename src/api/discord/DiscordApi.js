import {fetchAuto} from "../utils";
import {useQuery} from "react-query";

export async function getAccountInfo() {
  return await fetchAuto(`/users/@me`, {toJson: true})
}

export async function getGuilds() {
  return await fetchAuto(`/guilds`, {toJson: true})
}

export async function getGuild(id) {
  return await fetchAuto(`/guild/${id}`, {toJson: true})
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

export function useGuild(id) {
  return useQuery(
      ["guild", id],
      () => getGuild(id),
      {
        refetchOnWindowFocus: false
      }
  )
}

export function useGuilds() {
  return useQuery(
      "user_guilds",
      () => getGuilds(),
      {
        refetchOnWindowFocus: false,
      }
  )
}