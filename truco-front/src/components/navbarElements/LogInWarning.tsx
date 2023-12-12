import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';

const LogInWarning: React.FC = () => {

    const { user } = useContext(UserContext)

    return (
        <>
        {!user && <p className='text-primary font-bold text-sm'>{"(Inicia sesión para jugar)"}</p>}
        </>
    );
};

export default LogInWarning;
