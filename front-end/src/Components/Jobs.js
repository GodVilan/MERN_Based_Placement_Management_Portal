import React from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';

function Jobs() {
    const {uid} = useParams();
    return (
        <div>
            <Header uid={uid} />
        </div>
);
}

export default Jobs;