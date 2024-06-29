import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, ImageBackground, Modal } from 'react-native';
import { BlueButton, HeaderSimple, SafeAreaView } from '../components';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import  Menu  from '../components/Menu';
import CustomSelect from '../components/CustomSelect';
import ConditionItem from '../components/ConditionItem';
import { MaterialIcons } from '@expo/vector-icons';

export function ConditionInsert() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Sintoma");
    const [searchTerm, setSearchTerm] = useState("");
    const [records, setRecords] = useState([
        { id: 1, type: "Sintoma", description: "Dor de cabeça", isChecked: false },
        { id: 2, type: "Sintoma", description: "Febre", isChecked: false },
        { id: 3, type: "Comorbidade", description: "Diabetes", isChecked: false },
        { id: 4, type: "Comorbidade", description: "Hipertensão", isChecked: false },
        { id: 5, type: "Condição Especial", description: "Gravidez", isChecked: false },
        { id: 6, type: "Condição Especial", description: "Deficiência visual", isChecked: false },
    ]);
    const [menuVisible, setMenuVisible] = useState(false);

 function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

    let placeholderText = "Digite um sintoma";

    if (selectedOption === "Comorbidade") {
        placeholderText = "Digite uma comorbidade";
    } else if (selectedOption === "Condição Especial") {
        placeholderText = "Digite uma condição especial";
    }

    const filteredRecords = records.filter(record => {
        if (selectedOption === "Todos") {
            return record.description.toLowerCase().includes(searchTerm.toLowerCase());
        } else {
            return record.type === selectedOption && record.description.toLowerCase().includes(searchTerm.toLowerCase());
        }
    });

    const handleConditionPress = (id) => {
        const updatedRecords = records.map((record) =>
            record.id === id ? { ...record, isChecked: !record.isChecked } : record
        );
        setRecords(updatedRecords);
    };

    const handleSearchOrAddRecord = () => {
        const existingRecord = records.find(record =>
            record.description.toLowerCase() === searchTerm.toLowerCase() &&
            record.type === selectedOption
        );

        if (existingRecord) {
            setSearchTerm(existingRecord.description);
        } else {
            if (searchTerm.trim() !== "") {
                const newId = records.length ? records[records.length - 1].id + 1 : 1;
                const currentDate = new Date().toLocaleDateString();
                const newRecordObj = { id: newId, type: selectedOption, description: searchTerm, isChecked: false};
                setRecords([...records, newRecordObj]);
                setSearchTerm("");

                console.log('Novo registro em :', currentDate, newRecordObj);
            }
        }
    };

    const printCheckedRecords = () => {
        const currentDate = new Date().toLocaleDateString();
        const checkedRecords = records.filter(record => record.isChecked);
        checkedRecords.forEach(record => {
            console.log('Novo registro em:', currentDate, record);
        });
    };

    return (
        <SafeAreaView accessible={true} style={styles.safeArea}>
            <HeaderSimple titleScreen="Condições e Sintomas" />
            <ScrollView contentContainerStyle={styles.scrollViewContainer} onTouchStart={closeMenu}>
                <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
                    <MaterialIcons name="menu" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <View style={styles.textAPP}>
                            <Text style={styles.appName}>MoniPaEp</Text>
                        </View>
                        <CustomSelect
                            label=""
                            selectedValue={selectedOption}
                            onValueChange={(itemValue) => setSelectedOption(itemValue)}
                            items={[
                                { label: "Todos", value: "Todos" },
                                { label: "Sintoma", value: "Sintoma" },
                                { label: "Comorbidade", value: "Comorbidade" },
                                { label: "Condição Especial", value: "Condição Especial" },
                            ]}
                        />
                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder={placeholderText}
                                placeholderTextColor={colors.gray_dark3}
                                value={searchTerm}
                                onChangeText={text => setSearchTerm(text)}
                                onSubmitEditing={handleSearchOrAddRecord}
                                returnKeyType="search"
                            />
                        </View>
                    </View>
                    <View style={styles.optionsContainer}>
                        {filteredRecords.map((record, index) => (
                            <React.Fragment key={record.id}>
                                <ConditionItem
                                    description={record.description}
                                    isChecked={record.isChecked}
                                    onPress={() => handleConditionPress(record.id)}
                                />
                                {index !== filteredRecords.length && <View style={styles.hr} />}
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottom}>
                <BlueButton
                    accessibilityLabel="Botão. Clique para atualizar condições de saúde"
                    title="Atualizar Condições"
                    onPress={() => {
                        handleSearchOrAddRecord();
                        printCheckedRecords();
                    }}
                />
                
            </View>
            <Modal
                visible={menuVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeMenu}
            >
                <Menu onCloseMenu={closeMenu} />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollViewContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textAPP: {
        marginTop: '15%',
        alignItems: 'center',
    },
    appName: {
        fontFamily: fonts.appName,
        fontSize: 32,
        color: colors.blue,
    },
    menuButton: {
        position: 'absolute',
        top: 30,
        left: 20,
        zIndex: 100,
    },
    inputContainer: {
        marginTop: 0,
    },
    inputWrapper: {
        borderWidth: 1,
        width:'87%',
        borderColor: colors.gray_light2,
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontFamily: fonts.generic,
        fontSize: 18,
        marginBottom: 5,
    },
    select: {
        flex: 1,
        color: colors.black,
    },
    searchContainer: {
        width: '90%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray_light2,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    imageBackground: {
        width: 35,
        height: 30,
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -14 }],
    },
    addRecordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    addRecordInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray_light2,
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    optionsContainer: {
        width: '90%',
        marginTop: 20,
    },
    bottom: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    hr: {
        borderBottomColor: colors.gray_light2,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
});
