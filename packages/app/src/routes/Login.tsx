import { Fragment } from 'react';
import { useAuth } from '../auth';

export default function Login() {
    const auth = useAuth();

    return (
        <Fragment>
            <img src="/rijkshuisstijl/logo.svg" alt="Logo Rijksoverheid" className="logo" />
            <main>
                <h1>Bewijs wie je bent</h1>
                <p>
                    Kies de manier waarop je wilt bewijzen wie je bent. Zo kunnen we jouw gegevens
                    veilig opvragen bij je huisarts, ziekenhuizen en andere zorgverleners.
                </p>
                <ul style={{ listStyleType: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                    <li>
                        <button onClick={() => void auth.signinRedirect()}>
                            Inloggen met DigiD
                        </button>
                    </li>
                    <li>
                        <button disabled>Inloggen als gemachtigde</button>
                    </li>
                    <li>
                        <button disabled>European login</button>
                    </li>
                </ul>
            </main>
        </Fragment>
    );
}
