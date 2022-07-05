export async function getAccountInfo(context) {
  const { tokenType, accessToken } = context;

  const userResult = await fetch("https://discordapp.com/api/users/@me", {
    headers: {
      authorization: `${tokenType} ${accessToken}`,
    },
  }).then((result) => result.json());

  const guildsResult = await fetch(
    "https://discordapp.com/api/users/@me/guilds",
    {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    }
  ).then((result) => result.json());

  const guilds = guildsResult;

  return {
    user: userResult,
    guilds: Array.from(guilds).filter((g) => g.owner),
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
