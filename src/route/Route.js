import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "../components/SignUp/SignUp.js"
import Signin from "../components/SignIn/SignIn.js"
import { DashBoard } from "../components/DashBoard/DashBoard.jsx";
import Archive from "../components/Archive/Archive.jsx";
import Trash from "../components/TrashBin/TrashBin.jsx";
import { Notes } from "../components/Notes/Notes.jsx";
import { AuthRoute } from "./AuthRoute.js";
import { ProtectedRoute } from "./ProtectedRoute.js";

function Routing(){
    const route = createBrowserRouter([
        {
            path: '',
            element: <AuthRoute><Signin/></AuthRoute>
        },
        {
            path: "signup",
            element: <AuthRoute><Signup/></AuthRoute>
        },
        {
            path: "dashboard",
            element: <ProtectedRoute><DashBoard/></ProtectedRoute> ,
                children:[{
                    path: 'notes',
                    element: <Notes/>
                },
                {
                    path: 'archive',
                    element: <Archive/>
                },
                {
                    path: 'trash',
                    element: <Trash/>
                }
            ]
        }
    ])

    return  <RouterProvider router={route}/>
}

export default Routing;