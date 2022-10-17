import {BrowserRouter} from 'react-router-dom';
import {AuthProvider} from './context';
import {Router} from './router/Router';
import {withErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from './services/errorBoundary/ErrorFallback';
import './styles.scss';
import {LeadersProvider} from "./context/Leaders";


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <LeadersProvider>
                    <Router/>
                </LeadersProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default withErrorBoundary(App, {
    FallbackComponent: ErrorFallback
});
