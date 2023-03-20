import { Refine } from '@refinedev/core';
import { Layout, notificationProvider, ErrorComponent } from '@refinedev/antd';
import routerBindings, { UnsavedChangesNotifier } from '@refinedev/react-router-v6';
import dataProvider from '@refinedev/simple-rest';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AntdInferencer } from '@refinedev/inferencer/antd';

import '@refinedev/antd/dist/reset.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Refine
        routerProvider={routerBindings}
        dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
        notificationProvider={notificationProvider}
        resources={[
          {
            name: 'products',
            list: '/products',
            show: '/products/show/:id',
            create: '/products/create',
            edit: '/products/edit/:id',
          },
        ]}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}>
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }>
            <Route path="products">
              <Route index element={<AntdInferencer />} />
              <Route path="show/:id" element={<AntdInferencer />} />
              <Route path="edit/:id" element={<AntdInferencer />} />
              <Route path="create" element={<AntdInferencer />} />
            </Route>
            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Routes>
        <UnsavedChangesNotifier />
      </Refine>
    </BrowserRouter>
  );
};

export default App;
