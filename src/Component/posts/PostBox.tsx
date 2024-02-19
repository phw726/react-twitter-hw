import FollowingBox from 'Component/Following/followingBox';
import useTranslation from 'Hook/useTranslation';
import { PostProps } from 'Pages/Home';
import AuthContext from 'context/AuthContext';
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from 'firebaseApp';
import { useContext } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PostBoxProps {
  post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {
  const { user } = useContext(AuthContext);
  const t = useTranslation();
  const truncate = (str: string) => {
    return str?.length > 10 ? str?.substring(0, 10) + '...' : str;
  };

  const navigate = useNavigate();
  const imageRef = ref(storage, post?.imageUrl);

  const toggleLike = async () => {
    const postRef = doc(db, 'posts', post.id);

    // 사용자가 좋아요를 미리 한 경우 -> 좋아요 취소

    if (user?.uid && post?.likes?.includes(user?.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
      });
    } else {
      // 사용자가 좋아요를 하지 않은 경우 -> 좋아요 추가
      await updateDoc(postRef, {
        likes: arrayUnion(user?.uid),
        likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
      });

      //좋아요 알림 만들기
      if (user?.uid !== post?.uid) {
        await addDoc(collection(db, 'notifications'), {
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          uid: post?.uid,
          isRead: false,
          url: `/posts/${post?.id}`,
          content: `"${user?.email || user?.displayName}"님이 "${truncate(post?.content)}" 글을 좋아합니다.`,
        });
      }
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm(t('DELETE_POST_CONFIRM'));

    if (confirm) {
      // 스토리지 이미지 먼저 삭제

      if (post?.imageUrl) {
        deleteObject(imageRef).catch(error => {
          console.log(error);
        });
      }

      await deleteDoc(doc(db, 'posts', post.id));
      toast.success(t('DELETE_POST'));
      navigate('/');
    }
  };

  return (
    <div className="post__box" key={post?.id}>
      <div className="post__box-profile">
        <div className="post__flex">
          {post?.profileUrl ? (
            <img src={post?.profileUrl} alt="profile" className="post__box-profile-img" />
          ) : (
            <FaUserCircle className="post__box-profile-icon" />
          )}

          <div className="post__flex--between">
            <div className="post__flex">
              <div className="post__email">{post?.email}</div>
              <div className="post__createdAt">{post?.createdAt}</div>
            </div>

            <FollowingBox post={post} />
          </div>
        </div>
        <Link to={`/posts/${post?.id}`}>
          <div className="post__box-content">{post?.content}</div>

          {post?.imageUrl && (
            <div className="post__image-div">
              <img src={post?.imageUrl} alt="post img" className="post__image" width={100} height={100} />
            </div>
          )}

          <div className="post-form__hashtags-outputs">
            {post?.hashTags?.map((tag, index) => (
              <span className="post-form__hashtags-tag" key={index}>
                #{tag}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <div className="post__box-footer">
        {user?.uid === post?.uid && (
          <>
            <button type="button" className="post__delete" onClick={handleDelete}>
              {t('BUTTON_DELETE')}
            </button>

            <button type="button" className="post__edit">
              <Link to={`/posts/edit/${post?.id}`}>{t('BUTTON_EDIT')}</Link>
            </button>
          </>
        )}

        <button type="button" className="post__likes" onClick={toggleLike}>
          {user && post?.likes?.includes(user.uid) ? <AiFillHeart /> : <AiOutlineHeart />}
          {post?.likeCount || 0}
        </button>
        <button type="button" className="post__comments">
          <FaRegComment />
          {post?.comments?.length || 0}
        </button>
      </div>
    </div>
  );
}
