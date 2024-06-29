import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../styles/colors';

interface SymptomCardProps {
    symptom: string;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.dateText}>Enviado em {formattedDate}</Text>
            <Text style={styles.symptomText}>
                <Text>Sintoma: </Text> {symptom}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: Dimensions.get('window').width * 0.9,
    },
    dateText: {
        fontSize: 12,
        color: colors.gray,
    },
    symptomText: {
        fontSize: 16,
        color: colors.black,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.black,
    }
});

export default SymptomCard;