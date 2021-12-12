import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
} from "firebase/auth";

export default () => {
  return new Promise<User>(async (resolve) => {
    const auth = getAuth();

    try {
      const result = await getRedirectResult(auth);
      if (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;

          if (user) {
            resolve(user);
          }
        }
      } else if (auth.currentUser) {
        resolve(auth.currentUser);
      } else {
        signInWithRedirect(auth, new GoogleAuthProvider());
      }
    } catch (error) {
      signInWithRedirect(auth, new GoogleAuthProvider());
    }
  });
};
