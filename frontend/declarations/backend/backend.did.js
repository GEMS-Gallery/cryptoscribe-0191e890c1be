export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'author' : IDL.Text,
    'timestamp' : IDL.Int,
    'category' : IDL.Text,
  });
  return IDL.Service({
    'addPost' : IDL.Func([IDL.Text, IDL.Text, IDL.Text, IDL.Text], [], []),
    'getCategories' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'getPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
