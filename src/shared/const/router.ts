export enum AppRoutes {
    MAIN = '/',
    PROFILE = 'profile',
    TASK='task',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteTaskByUser = () => `/tasks`;



