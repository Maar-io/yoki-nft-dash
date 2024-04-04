import axios from 'axios';
import { PlayerStats } from './types';
import { GRAPH_ENDPOINT } from './const';
export const fetchPlayersPage = async (skip: number, users: number, players: number): Promise<PlayerStats> => {
  let response;
  console.log('skip', skip);
  try {
    response = await axios.post(GRAPH_ENDPOINT, {
      query: `
      query MyQuery($first: Int, $skip: Int) {

        leaderboards(       first: $first,
          skip: $skip) {
          isUser,
          isPlayer
        }
      }
      `,
      variables: {
        first: 1000,
        skip: skip
      }
    });
  } catch (error) {
    console.error(error);
    // Return the current counts if the request fails
    return {
      users,
      players
    };
  }

  const leaderboards = response.data.data.leaderboards;
  console.log('leaderboards', leaderboards);
  if (!leaderboards || leaderboards.length === 0) {
    // Return the current counts if no data is returned
    return {
      users,
      players
    };
  }

  leaderboards.forEach((leaderboard: { isUser: boolean, isPlayer: boolean }) => {
    if (leaderboard.isUser) {
      users++;
    }
    if (leaderboard.isPlayer) {
      players++;
    }
  });

  await new Promise(resolve => setTimeout(resolve, 100));
  return fetchPlayersPage(skip + 1000, users, players);
};