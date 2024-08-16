import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
// import ECommerce from './pages/Dashboard/ECommerce';
import DefaultLayout from './layout/DefaultLayout';
import TableOne, { VpnUsers, FetchTableData } from './components/Tables/TableOne';
import ServerListPage from './components/Tables/ServerListPage';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const [vpnData, setVpnData] = useState<VpnUsers[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await FetchTableData();
      setVpnData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="VPN Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TableOne data={vpnData} />
            </>
          }
        />
        <Route
          path="/vpn-dashboard"
          element={
            <>
              <PageTitle title="VPN Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <TableOne data={vpnData} />
            </>
          }
        />
        <Route
          path="/server-list/:country"
          element={
            <>
              <PageTitle title="Server List | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ServerListPage data={vpnData} />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
