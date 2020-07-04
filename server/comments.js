let comments = [
  {
    id: '1',
    author: 'Nick',
    comment: 'Ok, I`m first!',
    date: 1593840943721,
  },
  {
    id: '2',
    author: 'Mike',
    comment: 'Let`s write our thinks there',
    date: 1593840991444,
  },
  {
    id: '3',
    author: 'Lisa',
    comment: 'I don`t know what to say...',
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
