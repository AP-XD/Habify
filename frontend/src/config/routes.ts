import IRoute from '../interfaces/route';
import LoginPage from '../pages/Login';
import EditPage from '../pages/Update-Page';
import HomePage from '../pages/HomePage';

const authRoutes: IRoute[] = [
    {
        path: '/signin',
        name: 'Login',
        auth: false,
        component: LoginPage
    },
    {
        path: '/signup',
        name: 'Register',
        auth: false,
        component: LoginPage
    }
];
const noteRoutes: IRoute[] = [
    {
        path: '/update',
        name: 'Edit',
        auth: true,
        component: EditPage
    },
    {
        path: '/update/:noteID',
        name: 'Edit',
        auth: true,
        component: EditPage
    }
];
const mainRoutes: IRoute[] = [
    {
        path: '/',
        name: 'Home',
        auth: true,
        component: HomePage
    }
];

const routes: IRoute[] = [...authRoutes, ...noteRoutes, ...mainRoutes];

export default routes;
