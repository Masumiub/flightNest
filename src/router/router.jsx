import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from '../pages/Login';
import Register from '../pages/Register';
import Flights from "../pages/Flights";
import AddFlight from "../pages/AddFlight";
import AdminRoute from "../routes/AdminRoute";
import FlightDetails from "../pages/FlightDetails";
import ManageFlights from "../pages/ManageFlights";
import ManageBookings from "../pages/ManageBookings";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import PrivateRoute from "../routes/PrivateRoute";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        hydrateFallbackElement: <Loading></Loading>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "about",
                Component: About
            },
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: 'flights',
                Component: Flights
            },
            {
                path: 'flightDetails/:id',
                loader: ({ params }) => fetch(`https://flight-server-six.vercel.app/api/flights/${params.id}`),
                element: <FlightDetails></FlightDetails>
            },
            {
                path: 'addFlight',
                element: <AdminRoute><AddFlight></AddFlight></AdminRoute>
            },
            {
                path: 'manageFlights',
                element: <AdminRoute><ManageFlights></ManageFlights></AdminRoute>
            },
            {
                path: 'manageBookings',
                element: <AdminRoute><ManageBookings></ManageBookings></AdminRoute>
            },
            {
                path: '/booking/:flightId',
                element: <PrivateRoute><Booking></Booking></PrivateRoute>
            },
            {
                path: '/my-bookings',
                element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
            }


        ],
    },
]);

export default router;