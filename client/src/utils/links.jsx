import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
    {
        //The path is a dot because it is the same as the current page
        //if we use '/' it will redirect to the home page
        text: 'add job',
        path: '.',
        icon: <FaWpforms />
    },
    {
        text: 'all jobs',
        path: 'all-jobs',
        icon: <MdQueryStats />
    },
    {
        text: 'stats',
        path: 'stats',
        icon: <IoBarChartSharp />
    },
    {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />
    },
    {
        text: 'admin',
        path: 'admin',
        icon: <MdAdminPanelSettings />
    },
    ]

export default links;