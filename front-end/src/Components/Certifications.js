import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';

function Certifications() {
    const {uid} = useParams();
    return (
        <div>
            <Header uid={uid} />
        </div>
);
}

export default Certifications;