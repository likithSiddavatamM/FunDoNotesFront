import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Signup from "./components/SignUp/SignUp.js"
import Signin from "./components/SignIn/SignIn.js"
import {Notes} from "./components/Notes/Notes.jsx";
import { DashBoard } from "./components/DashBoard/DashBoard.jsx";
import Archive from "./components/Archive/Archive.jsx";
import Trash from "./components/TrashBin/TrashBin.jsx";

function Routing(){
    const route = createBrowserRouter([
        {
            path: '',
            element: <Signin/>
        },
        {
            path: "signup",
            element: <Signup/>
        },
        {
            path: "dashboard",
            element: <DashBoard/>,
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