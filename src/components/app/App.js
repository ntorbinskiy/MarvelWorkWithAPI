import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));

const App = () => {
  return (
    <Suspense fallback={<Spinner/>}>
      <BrowserRouter>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="*" element={<Page404 />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
