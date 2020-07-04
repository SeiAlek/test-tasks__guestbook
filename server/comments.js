let comments = [
  {
    id: '1',
    author: 'Nick',
    comment: 'comment of comment one',
    date: 1593840943721,
  },
  {
    id: '2',
    author: 'Mike',
    comment: 'comment of comment two',
    date: 1593840991444,
  },
  {
    id: '3',
    author: 'Lisa',
    comment: 'comment of comment three',
    date: 1593841022187,
  },
];

const getComments = () => {
  return comments;
};

const addComment = (newComment) => {
  comments = [
    ...comments,
    newComment,
  ];
};

module.exports = {
  getComments,
  addComment,
};
