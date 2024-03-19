import axios from 'axios';

import { OmaStats } from './types';
import { GRAPH_ENDPOINT } from './const';

export const fetchOmaPage = async (skip: number, totalOMAs: number, totalTxOver30: number, totalResults: number): Promise<OmaStats> => {
  const response = await axios.post(GRAPH_ENDPOINT, {
    query: `
      query MyQuery($first: Int, $skip: Int) {
        transferSingles(
          first: $first,
          skip: $skip,
          where: {
            and: [
              {from_not: "0x0000000000000000000000000000000000000000"},
              {to_not: "0x0000000000000000000000000000000000000000"},
              {Yokis_id: "0"}
            ]
          }
        ) {
          value
        }
      }
    `,
    variables: {
      first: 100,
      skip: skip
    }
  });

  const values = response.data.data.transferSingles.map((single: { value: string }) => parseInt(single.value));
  const total = values.reduce((a: number, b: number) => a + b, 0);
  totalOMAs += total;

  const valuesGreaterOrEqual30 = values.filter((value: number) => value >= 30);
  totalTxOver30 += valuesGreaterOrEqual30.length;

  totalResults += values.length;

  if (values.length > 0) {
    return fetchOmaPage(skip + 100, totalOMAs, totalTxOver30, totalResults);
  } else {
    return {
      totalOMAs,
      totalTxOver30,
      totalResults
    };
  }
};

