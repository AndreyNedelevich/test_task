
import {RouteProps} from "react-router-dom";
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteMain,
    getRouteProfile,
    getRouteTaskByUser,

} from '@/shared/const/router';
import ProfilePage from "@/pages/ProfilePage/ui/ProfilePage";
import {MainPage} from "@/pages/MainPage";
import {TaskPage} from "@/pages/TaskPage";



export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },

    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
    },

    [AppRoutes.TASK]: {
        path: getRouteTaskByUser(),
        element: <TaskPage/>,
    },

    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
