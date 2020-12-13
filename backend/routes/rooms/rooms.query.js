const faunadb = require('faunadb');
const FaunaClient = require('../../fauna.config');

const { Get, Match, Index } = faunadb.query;

const RoomsQuery = {
  // CAREFUL! the first argument is empty
  // the second argument is what's passed by the query
  async roomByID(_, { id }) {
    const {
      data,
    } = await FaunaClient.query(
      Get(Match(Index('rooms_by_id'), id)),
    );

    console.log(data);
    // queries expect an iterable object, that's why we return an array
    return {
      code: '200',
      success: true,
      message: 'room retrieved',
      roomData: {
        id: data.id,
        name: data.name,
        timeLimit: data.timeLimit,
        voteOptions: data.voteOptions,
      },
    };
  },
};

module.exports = RoomsQuery;
