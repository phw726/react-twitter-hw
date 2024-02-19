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

  BUTTON_PROFILE: {
    ko: '프로필 수정',
    en: 'Edit Profile',
  },

  // post

  NO_POSTS: {
    ko: '게시글이 없습니다.',
    en: 'No Posts',
  },

  EDIT_POST: {
    ko: '게시글을 수정했습니다.',
    en: 'Your Post was successfully edited',
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

  DELETE_POST_CONFIRM: {
    ko: '해당 게시글을 삭제하시겠습니까?',
    en: 'Are you sure you want to delete this post? ',
  },

  DELETE_POST: {
    ko: '게시글을 삭제했습니다.',
    en: 'Your Post was successfully deleted ',
  },

  ADD_POST: {
    ko: '게시글을 생성했습니다.',
    en: 'Your Post was successfully added',
  },

  // comment

  DELETE_COMMENT: {
    ko: '댓글을 삭제했습니다.',
    en: 'Your Comment was successfully deleted ',
  },

  ADD_COMMENT: {
    ko: '댓글을 생성했습니다.',
    en: 'Your Comment was successfully added',
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

  // NOTIFICATIONS_FOLLOWING: {
  //   ko: '님이 팔로우를 했습니다.',
  //   en: 'is following you',
  // },

  NOTIFICATIONS_FOLLOW: {
    ko: '해당 사용자를 팔로우합니다.',
    en: 'Followed',
  },

  NOTIFICATIONS_UNFOLLOW: {
    ko: '해당 사용자를 언팔로우합니다.',
    en: 'Unfollowed',
  },

  // NOTIFICATIONS_LIKES: {},

  // NOTIFICATIONS_COMMENT: {},

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

  // profile

  PROFILE_EDIT: {
    ko: '프로필이 성공적으로 업데이트 되었습니다.',
    en: 'Your profile was successfully updated',
  },
};
export default TRANSLATIONS;
