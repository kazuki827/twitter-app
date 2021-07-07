import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
import Feed from './components/Feed';
import Auth from './components/Auth';

const App: React.FC = () => {
  // redux storeのuser stateを取得
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    // firebaseのユーザーに何らかの変化があったときに毎回呼び出される。
    // 現在ログインしているユーザーを取得。
    const unSub = auth.onAuthStateChanged((authUser) => {
      // User is signed in.
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
        // No user is signed in.
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default App;
