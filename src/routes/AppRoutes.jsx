import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";
import SearchResult from "../pages/SearchResult";
import BookingPage from "../pages/BookingPage";
import Confirmation from "../pages/Confirmation";
import About from "../pages/About";
import Connect from "../pages/Connect";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import StripeWrapper from "../pages/StripeWrapper";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "about", element: <About /> },
            { path: "connect", element: <Connect /> },
            { path: "sign-up", element: <SignUp /> },
            { path: "login", element: <Login /> },
            { path: "search", element: <SearchResult /> },
            { path: "booking", element: <BookingPage /> },
            { path: "payment", element: <StripeWrapper /> },
            { path: "confirmation", element: <Confirmation /> },
            { path: "*", element: <NotFound /> }
        ]
    }
]);

export default router;