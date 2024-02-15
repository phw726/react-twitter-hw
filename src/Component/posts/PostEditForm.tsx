import { PostProps } from 'Pages/Home';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { useCallback, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';

export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>('');

  const navigate = useNavigate();
  const handleFileUpload = () => {};

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);

      // console.log(docSnap.data(), docSnap.id);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (post) {
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
        });
        navigate(`/posts/${post?.id}`);
        toast.success('게시글을 수정했습니다.');
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'content') {
      setContent(value);
    }
  };

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  const removeTag = (tag: string) => {
    setTags(tags?.filter(val => val !== tag));
  };

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim());
  };

  const handleKeyup = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== '') {
      // 만약 같은 태그가 있다면 에러 (32=스페이스바)

      if (tags?.includes(e.target.value?.trim())) {
        toast.error('이미 존재하는 태그입니다.');
      } else {
        // 아니면 태그를 생성

        setTags(prev => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag('');
      }
    }
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
          <div className="post__header-text">뒤로가기</div>
        </button>
      </div>
      <textarea
        className="post-form__textarea"
        required
        name="content"
        id="content"
        placeholder="What is happening?"
        onChange={onChange}
        value={content}
      />

      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, index) => (
            <span className="post-form__hashtags-tag" key={index} onClick={() => removeTag(tag)}>
              #{tag}
            </span>
          ))}
        </span>

        <input
          className="post-form__input"
          name="hashtag"
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyup}
          value={hashTag}
        />
      </div>

      <div className="post-form__submit-area">
        <label htmlFor="file-input" className="post-form__file">
          <FiImage className="post-form__file-icon" />
        </label>
        <input type="file" name="file-input" accept="image/" onClick={handleFileUpload} className="hidden" />

        <input type="submit" value="수정" className="post-form__submit-btn" />
      </div>
    </form>
  );
}
