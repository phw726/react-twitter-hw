//////////////////////////////////////////////
/// 영어 | 한글 전환 시 텍스트 각각 지정하기 ///
//////////////////////////////////////////////

const TRANSLATIONS = {
  //menu

  MENU_HOME: {
    ko: '홈',
    en: 'Home',
  },

  MENU_PROFILE: {
    ko: '프로필',
    en: 'Profile',
  },

  MENU_SEARCH: {
    ko: '검색',
    en: 'Search',
  },

  MENU_NOTIFICATION: {
    ko: '알림',
    en: 'Notification',
  },

  MENU_LOGOUT: {
    ko: '로그아웃',
    en: 'Logout',
  },

  MENU_LOGIN: {
    ko: '로그인',
    en: 'Login',
  },

  // button

  BUTTON_FOLLOWING: {
    ko: '팔로잉',
    en: 'Following',
  },
  BUTTON_FOLLOW: {
    ko: '팔로우',
    en: 'Follow',
  },
  BUTTON_EDIT: {
    ko: '수정',
    en: 'Edit',
  },
  BUTTON_DELETE: {
    ko: '삭제',
    en: 'Delete',
  },
  BUTTON_EDIT_PROFILE: {
    ko: '프로필 수정',
    en: 'Edit Profile',
  },
  BUTTON_COMMENT: {
    ko: '댓글 입력',
    en: 'Comment',
  },

  BUTTON_TWEET: {
    ko: '보내기',
    en: 'Tweet',
  },

  // post

  NO_POSTS: {
    ko: '게시글이 없습니다.',
    en: 'No Posts',
  },
  POST_PLACEHOLDER: {
    ko: '내용을 입력해주세요.',
    en: 'What is happening?',
  },
  POST_HASHTAG: {
    ko: '해시태그 + 스페이스바 입력',
    en: 'Enter hashtags with spacebar',
  },
  POST_CHANGE_IMAGE: {
    ko: '이미지 변경',
    en: 'Change Image',
  },
  NAME_PLACEHOLDER: {
    ko: '이름',
    en: 'Name',
  },

  // tabs

  TAB_FOLLOWING: {
    ko: '팔로잉',
    en: 'following',
  },
  TAB_ALL: {
    ko: '전체',
    en: 'For You',
  },
  TAB_LIKES: {
    ko: '좋아요',
    en: 'Likes',
  },

  TAB_MY: {
    ko: '나의 트윗',
    en: 'My Tweets',
  },

  // search

  SEARCH_HASHTAGS: {
    ko: '해시태그 검색',
    en: 'Search Hashtags',
  },

  //!!!!!!!!!!!!!!!!!!!!!!!!! 태그 에러가 안먹힘//
  HASHTAG_ERROR: {
    ko: '이미 존재하는 태그입니다.',
    en: 'The tag already exists',
  },

  // notifications
  NO_NOTIFICATIONS: {
    ko: '알림이 없습니다.',
    en: 'No Notifications',
  },

  //signup, signin

  FORM_EMAIL: {
    ko: '이메일',
    en: 'Email',
  },
  FORM_PASSWORD: {
    ko: '비밀번호',
    en: 'Password',
  },
  FORM_PASSWORD_CHECK: {
    ko: '비밀번호 확인',
    en: 'Confirm Password',
  },

  NO_ACCOUNT: {
    ko: '계정이 없으신가요?',
    en: 'No Account?',
  },

  YES_ACCOUNT: {
    ko: '계정이 있으신가요?',
    en: 'Already have Account?',
  },

  LOGIN_WITH_GOOGLE: {
    ko: 'Google로 로그인',
    en: 'Continue with Google',
  },

  LOGIN_WITH_GITHUB: {
    ko: 'Github로 로그인',
    en: 'Continue with Github',
  },

  LOGIN_SUCCESS: {
    ko: '성공적으로 로그인 되었습니다.',
    en: 'You have successfully logged in',
  },

  LOGIN_EMAIL_ERROR: {
    ko: '이메일 형식이 올바르지 않습니다.',
    en: 'Invalid Email Format',
  },

  LOGIN_PASSWORD_ERROR: {
    ko: '비밀번호는 6자 이상이어야 합니다.',
    en: 'Password must be at least 6 characters',
  },

  SIGNUP_PASSWORD_ERROR: {
    ko: '비밀번호가 일치하지 않습니다.',
    en: 'Passwords do not match.',
  },

  SIGNUP_GOOGLE: {
    ko: 'Google로 회원가입',
    en: 'Continue with Google',
  },

  SIGNUP_GITHUB: {
    ko: 'Github로 회원가입',
    en: 'Continue with Github',
  },

  SIGNUP_LINK: {
    ko: '회원가입하기',
    en: 'Sign Up',
  },

  SIGNUP_SUCCESS: {
    ko: '성공적으로 회원가입 되었습니다.',
    en: 'You have successfully signed in',
  },

  SIGNIN_LINK: {
    ko: '로그인하기',
    en: 'Login',
  },

  SIGNUP: {
    ko: '회원가입',
    en: 'Sign Up',
  },
  LOGIN: {
    ko: '로그인',
    en: 'Login',
  },

  LOGOUT_SUCCESS: {
    ko: '성공적으로 로그아웃 되었습니다',
    en: 'You have successfully logged out',
  },

  BACK: {
    ko: '뒤로가기',
    en: 'Back',
  },

  // COMMENT_SUCCESS: {
  //   ko: '댓글을 생성했습니다.',
  //   en: 'You have successfully logged out',
  // },
};

export default TRANSLATIONS;
