import {ReactNode} from 'react';
import { Route, Navigate } from 'react-router-dom';

import { NOT_FOUND_ROUTE } from '@/routes/route-path';

interface Properties {
    deactivate: boolean
    element: ReactNode
    path: string
}

const PrivateRoute = (
    {
        path,
        element: Component,
        deactivate = false
    }: Properties
) => {
    if (deactivate) {
        return <Route path={path} element={<Navigate to={NOT_FOUND_ROUTE} />} />;
    }

const qweqwe = []
  qweqwe.push()

    return (
        <>
            <Route
                path={path}
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                element={<Component />}
            />
        </>
    )
}

export default PrivateRoute;