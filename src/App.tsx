import { Layout } from 'Component/Layout';
import Router from 'Component/Router';
import Loader from 'Component/loader/Loader';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from 'firebaseApp';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';

function App() {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <RecoilRoot>
      <Layout>
        <ToastContainer theme="dark" autoClose={1000} hideProgressBar newestOnTop />
        {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
      </Layout>
    </RecoilRoot>
  );
}

export default App;
