/** Tavern patrons — one per job Id — who each tell one chapter of the work history. */
export interface TavernCharacter {
  name: string
  archetype: string
  emoji: string
  intro: string
}

export const CAST: Record<string, TavernCharacter> = {
  "1": {
    name: "Aldric",
    archetype: "The Artificer",
    emoji: "🧙‍♂️",
    intro:
      "Sit, sit. I tend the SharePoint foundries of the VPO realm — threescore client tenants under my care. I bind Azure pipelines that deploy at a whisper and roll back before a goblet spills, and I broker peace with third-party guilds when their wares misbehave. The forge still burns, friend — this quest is not yet done.",
  },
  "2": {
    name: "Wulfric",
    archetype: "The Warden",
    emoji: "🛡️",
    intro:
      "Three winters I stood watch over the Xcoal realm. Two directories bound into one identity, fortresses of Nutanix and VMware humming in the vaults, and a hundred souls across three continents under my protection. When threats crept in from the dark, the NOC and SOC watchtowers and I answered together.",
  },
  "3": {
    name: "Corvus",
    archetype: "The Stormcaller",
    emoji: "🌩️",
    intro:
      "I rode the eastern roads for the PHOENIX healers, raising clinics from bare stone — ten practices at a time, wired, warded, and working by the promised day. Four hundred souls called on me for aid, and I once found ten thousand gold a year in wasted Office 365 licenses just lying about.",
  },
  "4": {
    name: "Fenwick",
    archetype: "The Wandering Bard",
    emoji: "🎻",
    intro:
      "Ah, the road! North America, Canada, even far Germany — wherever the great arenas raised their 50/50 raffles, I was there before the crowds, standing up the engines and steadying trembling hands as the coin was counted. Not one show fell to downtime on my watch.",
  },
  "5": {
    name: "Magda",
    archetype: "The Tinker",
    emoji: "⚙️",
    intro:
      "I broke retired machines for their bones, friend. Harvested what could live again, wiped what memories remained by the DoD rites, and raised an OSX altar that breathed new life into cast-off Apple relics. I even drew the first true map of that keep's network before I moved on.",
  },
  "6": {
    name: "Tam",
    archetype: "The Squire",
    emoji: "🗡️",
    intro:
      "My first oath was to the Geek Squad precinct of Greensburg. I untangled cursed machines for common folk who feared them, earned their trust and their thanks, and our precinct rose to be among the highest-regarded in the district. Every hero starts somewhere, eh?",
  },
  "7": {
    name: "Elsbeth",
    archetype: "The Scribe",
    emoji: "📜",
    intro:
      "In the quiet halls of Integrated Paramedical I kept the ledgers and the schedules, and when any device — machine, network, or scrying-glass — misbehaved, they called for me. Humble work, aye. But every chronicle needs its first page.",
  },
}

export const STRANGER: TavernCharacter = {
  name: "A Hooded Stranger",
  archetype: "The Wanderer",
  emoji: "🕵️",
  intro:
    "You don't know me, and I don't know you. But I've seen things worth telling, if you've the time to listen.",
}
