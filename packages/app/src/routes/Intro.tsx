import { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@minvws/pgo-app-ui';

import { useIntroSeen } from '../lib/introSeen';

export function Intro() {
    const navigate = useNavigate();
    const { setIntroSeen } = useIntroSeen();
    const [isPropositionSeen, setPropositionSeen] = useState(false);

    const handleClickNext = useMemo(
        () => () => {
            if (isPropositionSeen) {
                setIntroSeen(true);
                navigate('/overzicht');
            } else {
                setPropositionSeen(true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isPropositionSeen]
    );

    if (isPropositionSeen) {
        return (
            <Fragment>
                <h1 className="mb-8 text-3xl font-bold">Zo gebruikt de app jouw gegevens</h1>
                <div className="mb-16 text-xl">
                    <p className="mb-4">
                        In de privacyverklaring staat hoe Mijn Zorg jouw gegevens gebruikt. Dit zijn
                        de belangrijkste punten:
                    </p>
                    <ul className="mb-8 list-disc pl-4">
                        <li className="mb-4">
                            Je gegevens worden <strong>versleuteld</strong> en via een{' '}
                            <strong>veilige</strong> verbinding opgehaald.
                        </li>
                        <li className="mb-4">
                            De app haalt je gegevens direct op bij de zorgverleners die jij kiest.{' '}
                            <strong>Alleen jij hebt toegaang.</strong>
                        </li>
                        <li className="mb-4">
                            <strong>Je kiest zelf</strong> hoe je je gegevens wilt gebruiken en of
                            je ze wel of niet deelt met anderen.
                        </li>
                        <li className="mb-4">
                            Je kunt de gegevens in je overzicht{' '}
                            <strong>altijd verwijderen of opnieuw opvragen</strong>.
                        </li>
                    </ul>
                </div>
                <Button onClick={handleClickNext} className="mb-16 w-full text-xl">
                    Volgende
                </Button>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <h1 className="mb-8 text-3xl font-bold">
                Jouw gezond&shy;heids&shy;gegevens op één plek verzameld
            </h1>
            <div className="mb-16 text-xl">
                <p className="mb-4">
                    Inzien wat je huisarts, ziekenhuis en andere zorg&shy;verleners weten over jou.
                    Alles in één overzicht. Veilig en over&shy;zichtelijk.
                </p>
                <p className="mb-4">
                    Mijn Zorg is een eenvoudige versie van een Persoon&shy;lijke
                    Gezond&shy;heids&shy;omgeving (PGO).
                </p>
            </div>
            <Button onClick={handleClickNext} className="mb-16 w-full text-xl">
                Volgende
            </Button>
        </Fragment>
    );
}
