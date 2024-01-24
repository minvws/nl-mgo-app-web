import { useAuth } from './auth';
import Login from './routes/Login.tsx';
import Busy from './routes/Busy.tsx';
import Error from './routes/Error.tsx';
import Welcome from './routes/Welcome.tsx';

function App() {
    const auth = useAuth();

    if (auth.activeNavigator === 'signinSilent') {
        return <Busy task="inloggen" />;
    }
    if (auth.activeNavigator === 'signoutRedirect') {
        return <Busy task="uitloggen" />;
    }
    if (auth.isLoading) {
        return <Busy task="laden" />;
    }
    if (auth.error) {
        return <Error error={auth.error} />;
    }

    return auth.isAuthenticated ? <Welcome /> : <Login />;
}

export default App;
