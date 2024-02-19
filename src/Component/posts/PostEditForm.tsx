import { PostProps } from 'Pages/Home';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from 'firebaseApp';
import { useCallback, useContext, useEffect, useState } from 'react';
import { FiImage } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IoIosArrowBack } from 'react-icons/io';
import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import AuthContext from 'context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import useTranslation from 'Hook/useTranslation';

export default function PostEditForm() {
  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [hashTag, setHashTag] = useState<string>('');
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const t = useTranslation();

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();

    if (file) {
      fileReader?.readAsDataURL(file);

      fileReader.onloadend = (e: any) => {
        const { result } = e?.currentTarget;
        setImageFile(result);
      };
    }
  };
  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id);
      const docSnap = await getDoc(docRef);
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
      setContent(docSnap?.data()?.content);
      setTags(docSnap?.data()?.hashTags);
      setImageFile(docSnap?.data()?.imageUrl);

      // console.log(docSnap.data(), docSnap.id);
    }
  }, [params.id]);

  const onSubmit = async (e: any) => {
    setIsSubmitting(true);
    e.preventDefault();

    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    try {
      if (post) {
        // 기존사진 삭제 후 새로운 사진 업로드

        if (post?.imageUrl) {
          let imageRef = ref(storage, post?.imageUrl);
          await deleteObject(imageRef).catch(error => {
            console.log(error);
          });
        }

        // 새로운 사진있다면 업로드
        let imageUrl = '';
        if (imageFile) {
          const data = await uploadString(storageRef, imageFile, 'data_url');
          imageUrl = await getDownloadURL(data?.ref);
        }

        // 만약 사진이 아예 없다면 삭제
        const postRef = doc(db, 'posts', post?.id);
        await updateDoc(postRef, {
          content: content,
          hashTags: tags,
          imageUrl: imageUrl,
        });
        navigate(`/posts/${post?.id}`);
        toast.success('게시글을 수정했습니다.');
        setIsSubmitting(false);
        setImageFile(null);
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
        toast.error(t('HASHTAG_ERROR'));
      } else {
        // 아니면 태그를 생성

        setTags(prev => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
        setHashTag('');
      }
    }
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <div className="post__header">
        <button type="button" onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
          <div className="post__header-text">{t('BACK')}</div>
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
          placeholder={t('POST_HASHTAG')}
          onChange={onChangeHashTag}
          onKeyUp={handleKeyup}
          value={hashTag}
        />
      </div>

      <div className="post-form__submit-area">
        <div className="post-form__image-area">
          <label htmlFor="file-input" className="post-form__file">
            <FiImage className="post-form__file-icon" />
          </label>
          <input
            type="file"
            name="file-input"
            id="file-input"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {imageFile && (
            <div className="post-form__attachment">
              <img src={imageFile} alt="attachment" width={100} height={100} />
              <button className="post-form__clear-btn" type="button" onClick={handleDeleteImage}>
                Clear
              </button>
            </div>
          )}
        </div>

        <input type="submit" value={t('BUTTON_EDIT')} className="post-form__submit-btn" disabled={isSubmitting} />
      </div>
    </form>
  );
}
