import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "./pages/about/index.tsx";
import Contact from "./pages/contact/index.tsx";
import Layout from "./components/Layout.tsx";
import App from "./App.tsx";
import Blog from "./pages/blog/index.tsx";
import BlogDetail from "./pages/blog/blog-details/BlogDetail.tsx";

createRoot(document.getElementById("root")!).render(
  // StrictMode is a tool for highlighting potential problems in an application. It activates additional checks and warnings for its descendants.
  // and using on development mode only, it does not affect the production build.
  <StrictMode>
    {/* step 1: Wrap the App component with BrowserRouter to enable routing */}
    <BrowserRouter>
      <Routes>
        {/* step 2: Define the route for the home page */}
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
