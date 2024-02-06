import PostForm from 'Component/posts/PostForm';
import PostBox from 'Component/posts/PostBox';

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

const posts: PostProps[] = [
  {
    id: '1',
    email: 'phw726@naver.com',
    content: 'Hello World',
    createdAt: '2020-01-01',
    uid: '123123',
  },
  {
    id: '2',
    email: 'fdhw726@naver.com',
    content: 'Hello World',
    createdAt: '2020-01-01',
    uid: '456423',
  },
  {
    id: '3',
    email: 'phasd26@naver.com',
    content: 'Hello World',
    createdAt: '2020-01-01',
    uid: '789456',
  },
  {
    id: '4',
    email: 'sadsdph6@naver.com',
    content: 'Hellw72o World',
    createdAt: '2020-01-01',
    uid: '17893',
  },
  {
    id: '5',
    email: 'asdfs@naver.com',
    content: 'Hello World',
    createdAt: '2020-01-01',
    uid: '7897823',
  },
];

export default function HomePage() {
  return (
    <div className="home">
      <div className="home__title">HOME</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For You</div>
        <div className="home__tab ">Following</div>
      </div>

      <PostForm />

      <div className="post">
        {posts?.map(post => (
          <PostBox post={post} key={post?.id} />
        ))}
      </div>
    </div>
  );
}
