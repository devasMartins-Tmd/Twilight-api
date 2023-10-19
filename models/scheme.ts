type userProfile = {
  name: string;
  email: string;
  password: string;
  uniqueId: string;
  tag: string; // ['beginner', amateur, expert, master]
}; // users

type post = [
  {
    text: string;
    img?: string;
    likes: number;
    comment: [
      {
        commentator: string;
        likes: string;
      }
    ];
    postId: string;
  }
]; // post

type following = string[]; // users
type friends = string[]; // users
type feed = string[]; // post
type explore = string[]; // users
