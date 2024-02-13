import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { app } from 'firebaseApp';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignupForm() {
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const navigate = useNavigate();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
      toast.success('회원가입에 성공했습니다.');
    } catch (error: any) {
      toast.error(error?.code);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!value?.match(validRegex)) {
        setError('이메일 형식이 올바르지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);
      if (value?.length < 6) {
        setError('비밀번호는 6자 이상이어야 합니다.');
      } else if (value !== passwordConfirm) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    }

    if (name === 'password_confirm') {
      setPasswordConfirm(value);
      if (value?.length < 6) {
        setError('비밀번호는 6자 이상이어야 합니다.');
      } else if (value !== password) {
        setError('비밀번호가 일치하지 않습니다.');
      } else {
        setError('');
      }
    }
  };

  const onClickSocialLogin = async (e: any) => {
    const {
      target: { name },
    } = e;

    let provider;
    const auth = getAuth(app);

    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }

    if (name === 'github') {
      provider = new GithubAuthProvider();
    }

    await signInWithPopup(auth, provider as GithubAuthProvider | GoogleAuthProvider)
      .then(result => {
        console.log(result);
        toast.success('성공적으로 로그인 되었습니다.');
      })
      .catch(error => {
        console.log(error);
        const errorMessage = error?.message;
        toast?.error(errorMessage);
      });
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">회원가입</div>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" value={email} required onChange={onChange} />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" value={password} required onChange={onChange} />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">비밀번호 확인</label>
        <input
          type="password"
          name="password_confirm"
          id="password_confirm"
          value={passwordConfirm}
          required
          onChange={onChange}
        />
      </div>

      {/* 에러 있을 경우 */}

      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}

      <div className="form__block">
        계정이 있으신가요?
        <Link to="/user/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block--lg">
        <button type="submit" className="form__btn--submit" disabled={error?.length > 0}>
          회원가입
        </button>
      </div>

      {/* SNS 로그인하기 */}

      <div className="form__block">
        <button type="button" className="form__btn--google" name="google" onClick={onClickSocialLogin}>
          Google로 회원가입
        </button>
      </div>
      <div className="form__block">
        <button type="button" className="form__btn--github" name="github" onClick={onClickSocialLogin}>
          Github으로 회원가입
        </button>
      </div>
    </form>
  );
}
