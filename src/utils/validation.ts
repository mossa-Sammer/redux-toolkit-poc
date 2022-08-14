export const passwordValidation = {
  exp: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  msg: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
};
