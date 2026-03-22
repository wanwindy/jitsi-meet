import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { getParticipantCountForMobileDisplay } from '../../../base/participants/functions';

import styles from './styles';

const ParticipantsCounter = () => {
    const participantsCount = useSelector(getParticipantCountForMobileDisplay);

    return <Text style = { styles.participantsBadge }>{participantsCount}</Text>;
};

export default ParticipantsCounter;
