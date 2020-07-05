const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} = graphql;

const Comments = require('../models/comment');

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: GraphQLID },
    author: { type: GraphQLString },
    body: { type: GraphQLString },
    date: { type: GraphQLFloat },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addComment: {
      type: CommentType,
      args: {
        author: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLFloat) },
      },
      resolve(parent, { author, body, date }) {
        const comment = new Comments({
          author,
          body,
          date,
        });

        return comment.save();
      },
    },
    deleteComment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        return Comments.findByIdAndRemove(id);
      },
    },
    updateComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLID },
        author: { type: new GraphQLNonNull(GraphQLString) },
        body: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, { id, author, body }) {
        return Comments.findByIdAndUpdate(
          id,
          { $set: { author, body } },
          { new: true },
        );
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    comment: {
      type: CommentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Comments.findById(args.id);
      },
    },
    comments: {
      type: new GraphQLList(CommentType),
      resolve() {
        return Comments.find({}).sort({ date: -1 });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
