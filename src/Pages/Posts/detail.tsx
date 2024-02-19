import Loader from 'Component/loader/Loader';
import PostBox from 'Component/posts/PostBox';
import { PostProps } from 'Pages/Home';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import CommentForm from 'Component/Comment/commentForm';
import CommentBox, { CommentProps } from 'Component/Comment/CommentBox';
import useTranslation from 'Hook/useTranslation';

export default function PostDetailPage() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const navigate = useNavigate();
  const t = useTranslation();

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);

      onSnapshot(docRef, doc => {
        setPost({
          ...(doc?.data() as PostProps),
          id: doc.id,
        });
      });
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <div className="post">
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
          <div className="post__header-text">{t('BACK')}</div>
        </button>
      </div>
      {post ? (
        <>
          <PostBox post={post} />
          <CommentForm post={post} />
          {post?.comments
            ?.slice(0)
            ?.reverse()
            ?.map((data: CommentProps, index: number) => (
              <CommentBox data={data} key={index} post={post} />
            ))}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
