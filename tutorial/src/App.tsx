import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { notificationProvider } from "@refinedev/chakra-ui";

import { ChakraProvider } from "@chakra-ui/react";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
  NavigateToResource
} from "@refinedev/react-router-v6";
import { ErrorComponent, ThemedLayoutV2, useNotificationProvider, RefineThemes } from "@refinedev/chakra-ui";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import { ChakraUIInferencer } from "@refinedev/inferencer/chakra-ui";

import { UserList } from "./pages/users/list";
import { UserCreate } from "./pages/users/create";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        {/* You can change the theme colors here. example: theme={RefineThemes.Magenta} */}
        <ChakraProvider theme={RefineThemes.Blue}>
          <DevtoolsProvider>
            <Refine
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              dataProvider={dataProvider("http://localhost:8000")}
              resources={[
                {
                  name: "users",
                  list: "/users",
                  show: "/users/show/:id",
                  create: "/users/create",
                  edit: "/users/edit/:id",
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "KwC4G7-rY48nR-4uwi1D",
              }}
            >
              <Routes>
                <Route
                element={
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                }
              >
                <Route index element={<NavigateToResource resource="users" />} />
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path="show/:id" element={<ChakraUIInferencer />} />
                  <Route path="edit/:id" element={<ChakraUIInferencer />} />
                  <Route path="create" element={<UserCreate />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ChakraProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
