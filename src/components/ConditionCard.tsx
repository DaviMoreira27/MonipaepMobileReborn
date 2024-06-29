import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../styles/colors';

interface ConditionCardProps {
    condition: string;
}

const ConditionCard: React.FC<ConditionCardProps> = ({ condition }) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.dateText}>Enviado em {formattedDate}</Text>
            <Text style={styles.conditionText}>
                <Text>Condição: </Text> {condition}
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
    conditionText: {
        fontSize: 16,
        color: colors.black,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.black,
    }
});

export default ConditionCard;