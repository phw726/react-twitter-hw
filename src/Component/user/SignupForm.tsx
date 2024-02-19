import useTranslation from 'Hook/useTranslation';
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
  const t = useTranslation();

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
        setError(t('LOGIN_EMAIL_ERROR'));
      } else {
        setError('');
      }
    }

    if (name === 'password') {
      setPassword(value);
      if (value?.length < 6) {
        setError(t('LOGIN_PASSWORD_ERROR'));
      } else if (value !== passwordConfirm) {
        setError(t('SIGNUP_PASSWORD_ERROR'));
      } else {
        setError('');
      }
    }

    if (name === 'password_confirm') {
      setPasswordConfirm(value);
      if (value?.length < 6) {
        setError(t('LOGIN_PASSWORD_ERROR'));
      } else if (value !== password) {
        setError(t('SIGNUP_PASSWORD_ERROR'));
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
        toast.success(t('SIGNUP_SUCCESS'));
      })
      .catch(error => {
        console.log(error);
        const errorMessage = error?.message;
        toast?.error(errorMessage);
      });
  };

  return (
    <form className="form form--lg" onSubmit={onSubmit}>
      <div className="form__title">{t('SIGNUP')}</div>
      <div className="form__block">
        <label htmlFor="email">{t('FORM_EMAIL')}</label>
        <input type="text" name="email" id="email" value={email} required onChange={onChange} />
      </div>
      <div className="form__block">
        <label htmlFor="password">{t('FORM_PASSWORD')}</label>
        <input type="password" name="password" id="password" value={password} required onChange={onChange} />
      </div>
      <div className="form__block">
        <label htmlFor="password_confirm">{t('FORM_PASSWORD_CHECK')}</label>
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
        {t('YES_ACCOUNT')}
        <Link to="/user/login" className="form__link">
          {t('LOGIN')}
        </Link>
      </div>
      <div className="form__block--lg">
        <button type="submit" className="form__btn--submit" disabled={error?.length > 0}>
          {t('SIGNUP')}
        </button>
      </div>

      {/* SNS 로그인하기 */}

      <div className="form__block">
        <button type="button" className="form__btn--google" name="google" onClick={onClickSocialLogin}>
          {t('SIGNUP_GOOGLE')}
        </button>
      </div>
      <div className="form__block">
        <button type="button" className="form__btn--github" name="github" onClick={onClickSocialLogin}>
          {t('SIGNUP_GITHUB')}
        </button>
      </div>
    </form>
  );
}
