const axios = require('axios');
const _ = require('lodash');

let skip = 0;
let totalOMAs = 0;
let totalTxOver30 = 0;
let totalResults = 0;
const GRAPH_ENDPOINT = 'https://api.studio.thegraph.com/query/68002/yoki-origins/version/latest';

const fetchPage = async (skip) => {
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

    const values = response.data.data.transferSingles.map(single => parseInt(single.value));
    const total = values.reduce((a, b) => a + b, 0);
    totalOMAs += total;

    const valuesGreaterOrEqual30 = values.filter(value => value >= 30);
    totalTxOver30 += valuesGreaterOrEqual30.length;

    totalResults += values.length;

    if (values.length > 0) {
        await fetchPage(skip + 100);
    }
};

fetchPage(0).then(() => {
    console.log('Total OMAs transferred:', totalOMAs);
    console.log('Count of Tx with over 30 OMAs per Tx:', totalTxOver30);
    console.log('Total number Tx with OMAs transferred:', totalResults);
}).catch(console.error);