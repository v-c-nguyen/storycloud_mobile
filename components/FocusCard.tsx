import { useChildrenStore } from '@/store/childrenStore';
import { useLearningCategoryStore } from '@/store/learningCategoryStore';
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { ChildrenCard } from './ChildrenCard';
import { LearningTargetCard } from './LearningTargetCard';
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const editIcon = require('@/assets/images/parent/icon-edit.png');
const detailBtn = require('@/assets/images/parent/icon-detailBtn.png');
const stepIcon = require('@/assets/images/parent/icon-step.png');
const focusIcon = require('@/assets/images/parent/icon-focus.png');

const clockIcon = require('@/assets/images/parent/icon-clock.png');
const dateIcon = require('@/assets/images/parent/icon-date.png');
const happyIcon = require('@/assets/images/parent/icon-happy.png');
const docIcon = require('@/assets/images/parent/icon-doc.png');
const topButton = require('@/assets/images/parent/icon-top.png');
const miaAvatar = require('@/assets/images/parent/dashboard/Mia_60x60.png');
const checkIcon = require('@/assets/images/parent/dashboard/selected.png');
const jesseAvatar = require('@/assets/images/parent/dashboard/Jesse_60x60.png');
const plusIcon = require("@/assets/images/parent/icon-plus.png")
const cancelIcon = require('@/assets/images/parent/icon-cancel.png')
const informationIcon = require('@/assets/images/parent/information_circle.png')

interface Child {
    id: string,
    name: string,
    age: number,
    mode: string,
    avatar_url?: string
}

export function FocusCard({ focus, handleEditButton, handleViewButton }: { focus: any, handleEditButton: (id: string) => void, handleViewButton: (id: string) => void }) {
    // Format date if available
    const formattedDate = focus?.created_at
        ? new Date(focus.created_at).toLocaleDateString()
        : '';
    return (
        <ThemedView style={styles.container}>
            <ThemedView style={styles.overview}>
                <Image source={focusIcon} />
                <ThemedText style={styles.title}>{focus?.name}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.pathwayCard}>
                <ThemedView style={[styles.lengthContainer, { borderBottomWidth: 1, borderColor: 'rgba(252, 252, 252, 0.2)' }]}>
                    <ThemedView style={styles.flexRow}>
                        <ThemedView style={[styles.iconBtnCircle, { padding: 5 }]}><Image source={dateIcon} width={17} /> </ThemedView>
                        <ThemedText style={styles.lengthLabel}>Date</ThemedText>
                        <ThemedText style={styles.lengthText}>{formattedDate}</ThemedText>
                    </ThemedView>
                    <ThemedView style={styles.flexRow}>
                        <TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => handleEditButton(focus.id)}
                        >
                            <Image source={editIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                        </TouchableOpacity>
                        <ThemedText style={{ color: 'rgba(122, 193, 198, 0.5)' }}> | </ThemedText>
                        <TouchableOpacity
                            style={[styles.iconBtn, styles.iconBtnCircle]}
                            onPress={() => handleViewButton(focus.id)}
                        >
                            <Image source={detailBtn}></Image>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={[styles.lengthContainer, styles.flexCol]}>
                    <ThemedView style={[styles.flexCol, { width: '100%' }]}>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView>
                                    <ThemedText style={styles.lengthLabel}>Learning Categories</ThemedText>
                                    {
                                        focus?.focusmodes_targets?.length > 0 && focus.focusmodes_targets.map((target: any, index: number) => (
                                            <ThemedText key={index} style={styles.categoryText}>
                                                {target.learning_categories?.name}
                                            </ThemedText>
                                        )
                                        )
                                    }
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={[styles.flexCol, { justifyContent: 'space-between', width: '100%', marginTop: 20 }]} >
                        <ThemedView style={styles.flexRow}>
                            <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={happyIcon} style={styles.ButtonIcon} /> </ThemedView>
                            <ThemedText style={styles.lengthLabel}>Children</ThemedText>
                        </ThemedView>
                        {
                            focus?.focusmodes_kids?.length > 0 && focus.focusmodes_kids.map((target: any, index: number) => (
                                <ThemedView key={index} style={[styles.flexRow, styles.progressBar]}>
                                    <Image source={miaAvatar} style={styles.avatar}></Image>
                                    <ThemedView style={styles.avatarOutline}>
                                        <Image source={checkIcon} style={styles.checkAvatar}></Image>
                                    </ThemedView>
                                </ThemedView>
                            )
                            )
                        }

                    </ThemedView>
                </ThemedView>

            </ThemedView>
        </ThemedView>
    );
}

export function FocusDetailedCard({ focus }: { focus: any }) {
    const router = useRouter();
    // Format date if available
    const formattedDate = focus?.created_at
        ? new Date(focus.created_at).toLocaleDateString()
        : '';
    function handleBack() {
        router.navigate("./")
    }
    return (
        <ThemedView style={[styles.container_detail]}>
            <ThemedView style={[styles.overview, { alignItems: 'center' }]}>
                <Image source={focusIcon} />
                <ThemedText style={styles.title}>{focus?.name}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.pathwayCard}>
                <ThemedView style={[styles.lengthContainer, { borderBottomWidth: 1, borderColor: 'rgba(252, 252, 252, 0.2)' }]}>
                    <ThemedView style={[styles.flexCol, { width: '100%' }]}>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={dateIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>Date</ThemedText>
                                <ThemedText style={styles.lengthText}>
                                    {formattedDate}
                                </ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.flexRow}>
                                <TouchableOpacity style={styles.iconBtn}>
                                    <Image source={editIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                                </TouchableOpacity>
                                <ThemedText style={{ color: 'rgba(122, 193, 198, 0.5)' }}> | </ThemedText>
                                <TouchableOpacity
                                    onPress={handleBack}
                                    style={[styles.iconBtn, styles.iconBtnCircle, styles.backOrange]}>
                                    <Image source={topButton}></Image>
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={focusIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>{focus?.name}</ThemedText>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={[styles.flexRow, { alignItems: 'flex-start' }]}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8, marginTop: 8 }]}><Image source={docIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedView style={{ width: '90%' }}>
                                    <ThemedText style={styles.lengthLabel}>Description</ThemedText>
                                    <ThemedText style={[styles.descriptionText, { paddingRight: 20 }]}>
                                        {focus?.description}
                                    </ThemedText>
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>

                <ThemedView style={[styles.lengthContainer, styles.flexCol]}>
                    <ThemedView style={[styles.flexCol, { width: '100%' }]}>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView>
                                    <ThemedText style={styles.lengthLabel}>Learning Categories</ThemedText>
                                    {
                                        focus?.focusmodes_targets?.length > 0 && focus.focusmodes_targets.map((target: any, index: number) => (
                                            <ThemedText key={index} style={styles.categoryText}>
                                                {target.learning_categories?.name}
                                            </ThemedText>
                                        )
                                        )
                                    }
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>

                    <ThemedView style={[styles.flexCol, { justifyContent: 'space-between', width: '100%', marginTop: 20 }]} >
                        <ThemedView style={styles.flexRow}>
                            <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={happyIcon} style={styles.ButtonIcon} /> </ThemedView>
                            <ThemedText style={styles.lengthLabel}>Children</ThemedText>
                        </ThemedView>
                        {
                            focus?.focusmodes_kids?.length > 0 && focus.focusmodes_kids.map((target: any, index: number) => (
                                <ThemedView key={index} style={[styles.flexRow, styles.progressBar]}>
                                    <Image source={miaAvatar} style={styles.avatar}></Image>
                                    <ThemedView style={styles.avatarOutline}>
                                        <Image source={checkIcon} style={styles.checkAvatar}></Image>
                                    </ThemedView>
                                </ThemedView>
                            )
                            )
                        }
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView >
    );
}

export function FocusEditCard({ focus }: { focus: any }) {
    const { categories: allCategories } = useLearningCategoryStore();
    const { children: allChildren } = useChildrenStore();

    const router = useRouter();
    const [editName, setEditName] = React.useState(false);
    const [editDescription, setEditDescription] = React.useState(false);
    const [name, setName] = React.useState(focus?.name || '');
    const [description, setDescription] = React.useState(focus?.description || '');
    const [categories, setCategories] = React.useState(focus?.focusmodes_targets ? [...focus.focusmodes_targets] : []);
    const [children, setChildren] = React.useState<Child[]>(focus?.focusmodes_kids ? [...focus.focusmodes_kids] : []);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalType, setModalType] = React.useState<'category' | 'child' | null>(null);

    useEffect(() => {
        setName(focus?.name || '')
        setDescription(focus?.description || '')
        setCategories(focus?.focusmodes_targets ? [...focus.focusmodes_targets] : [])
        setChildren(focus?.focusmodes_kids ? [...focus.focusmodes_kids] : []);
    }, [focus])

    // Remove category by index
    const handleRemoveCategory = (idx: number) => {
        setCategories(categories.filter((_, i) => i !== idx));
    };
    // Remove child by index
    const handleRemoveChild = (idx: number) => {
        setChildren(children.filter((_, i) => i !== idx));
    };
    // Show modal for add
    const handleAddCategory = () => {
        setModalType('category');
        setModalVisible(true);
    };
    const handleAddChild = () => {
        setModalType('child');
        setModalVisible(true);
    };

    // Add category/child from modal
    const handleSelectCategory = (cat: any) => {
        setCategories(prev => [...prev, cat]);
        setModalVisible(false);
    };
    const handleSelectChild = (kid: any) => {
        setChildren(prev => [...prev, kid]);
        setModalVisible(false);
    };
    // Format date if available
    const formattedDate = focus?.created_at
        ? new Date(focus.created_at).toLocaleDateString()
        : '';
    function handleBack() {
        router.navigate("./")
    }
    function handleTargetSelected(target: { id: string, name: string }) {
        setCategories(prev => {
            const exists = prev.some(t => t.id === target.id);
            if (exists) {
                return prev.filter(t => t.id !== target.id);
            } else {
                return [...prev, target];
            }
        });
    }
    function handleChildSelected(child: Child) {
        setChildren(prev =>
            prev.includes(child)
                ? prev.filter(t => t !== child)
                : [...prev, child]
        );
    }

    return (
        <ThemedView style={[styles.container_detail]}>
            <ThemedView style={[styles.overview, { alignItems: 'center' }]}>
                <Image source={focusIcon} />
                <ThemedText style={styles.title}>{name}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.focusEditCard}>
                <ThemedView style={[styles.lengthContainer, { borderBottomWidth: 1, borderColor: 'rgba(252, 252, 252, 0.2)' }]}>
                    <ThemedView style={[styles.flexCol, { width: '100%' }]}>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={dateIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedText style={styles.lengthLabel}>Date</ThemedText>
                                <ThemedText style={styles.lengthText}>{formattedDate}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.flexRow}>
                                <TouchableOpacity
                                    style={styles.iconBtn}
                                    onPress={() => setEditName(true)}
                                >
                                    <Image source={cancelIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                                </TouchableOpacity>
                                <ThemedText style={{ color: 'rgba(122, 193, 198, 0.5)' }}> | </ThemedText>
                                <TouchableOpacity
                                    onPress={handleBack}
                                    style={[styles.iconBtn, styles.iconBtnCircle, styles.backOrange]}>
                                    <Image source={topButton}></Image>
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={styles.flexRow}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={focusIcon} style={styles.ButtonIcon} /> </ThemedView>
                                {editName ? (
                                    <input
                                        style={{
                                            color: 'white',
                                            fontSize: 16,
                                            marginRight: 8,
                                            background: 'rgba(0,0,0,0.2)',
                                            border: '1px solid #9fd3c7',
                                            borderRadius: 8,
                                            padding: 6,
                                            marginTop: 8,
                                            marginBottom: 8,
                                            width: 180
                                        }}
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        onBlur={() => setEditName(false)}
                                        autoFocus
                                    />
                                ) : (
                                    <ThemedText style={styles.lengthLabel}>{name}</ThemedText>
                                )}
                                <TouchableOpacity
                                    style={styles.iconBtn}
                                    onPress={() => setEditName(true)}
                                >
                                    <Image source={editIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                                </TouchableOpacity>
                            </ThemedView>
                        </ThemedView>
                        <ThemedView style={[styles.flexRow, { justifyContent: 'space-between' }]} >
                            <ThemedView style={[styles.flexRow, { alignItems: 'flex-start' }]}>
                                <ThemedView style={[styles.iconBtnCircle, { padding: 8, marginTop: 8 }]}><Image source={docIcon} style={styles.ButtonIcon} /> </ThemedView>
                                <ThemedView style={{ width: '90%' }}>
                                    <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <ThemedText style={styles.lengthLabel}>Description</ThemedText>
                                        <TouchableOpacity
                                            style={styles.iconBtn}
                                            onPress={() => setEditDescription(true)}
                                        >
                                            <Image source={editIcon} tintColor={'rgba(122, 193, 198, 1)'}></Image>
                                        </TouchableOpacity>
                                    </ThemedView>

                                    {editDescription ? (
                                        <textarea
                                            style={{
                                                fontSize: 14,
                                                color: 'white',
                                                background: 'rgba(0,0,0,0.2)',
                                                border: '1px solid #9fd3c7',
                                                borderRadius: 8,
                                                padding: 6,
                                                marginTop: 8,
                                                marginBottom: 8,
                                                width: 250,
                                                maxWidth: 280,
                                                height: 100,
                                                boxSizing: 'border-box',
                                                resize: 'none'
                                            }}
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            onBlur={() => setEditDescription(false)}
                                            autoFocus
                                        />
                                    ) : (
                                        <ThemedText style={[styles.descriptionText, { paddingRight: 20, width: '100%', maxWidth: 280 }]}>
                                            {description}
                                        </ThemedText>
                                    )}
                                </ThemedView>
                            </ThemedView>
                        </ThemedView>
                    </ThemedView>
                </ThemedView>
                <ThemedView style={{ padding: 16 }}>
                    <ThemedView>
                        <ThemedText style={styles.lengthLabel}>Learning Categories</ThemedText>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}
                        >
                            {categories.length > 0 && categories.map((target: any, index: number) => (
                                <ThemedView key={index} style={[styles.flexRow, styles.categoryEditBtn]}>
                                    <ThemedText style={[styles.categoryEditText]}>
                                        {target.learning_categories?.name}
                                    </ThemedText>
                                    <TouchableOpacity onPress={() => handleRemoveCategory(index)}>
                                        <ThemedView style={styles.categoryEditIconContainer}>
                                            <Image source={cancelIcon} style={styles.categoryEditIcon}></Image>
                                        </ThemedView>
                                    </TouchableOpacity>
                                </ThemedView>
                            ))}
                            <ThemedView style={[styles.flexRow, styles.categoryEditBtn]}>
                                <ThemedText style={[styles.categoryEditText]}>
                                    Add New Category
                                </ThemedText>
                                <TouchableOpacity onPress={handleAddCategory}>
                                    <ThemedView style={styles.categoryEditIconContainer}>
                                        <Image source={plusIcon} style={styles.categoryEditIcon}></Image>
                                    </ThemedView>
                                </TouchableOpacity>
                            </ThemedView>
                        </ScrollView>
                    </ThemedView>

                    <ThemedView style={{ width: '100%', marginTop: 20 }} >
                        <ThemedView style={[styles.flexRow]}>
                            <ThemedView style={[styles.iconBtnCircle, { padding: 8 }]}><Image source={happyIcon} style={styles.ButtonIcon} /> </ThemedView>
                            <ThemedText style={styles.lengthLabel}>Children</ThemedText>
                        </ThemedView>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ flexDirection: 'row', marginTop: 20, gap: 10, alignItems: 'center' }}
                        >
                            {children.length > 0 && children.map((target: any, index: number) => (
                                <ThemedView key={index} style={[styles.flexRow, styles.progressBar]}>
                                    <Image source={miaAvatar} style={styles.avatar}></Image>
                                    <TouchableOpacity onPress={() => handleRemoveChild(index)}>
                                        <ThemedView style={styles.categoryEditIconContainer}>
                                            <Image source={cancelIcon} style={styles.categoryEditIcon}></Image>
                                        </ThemedView>
                                    </TouchableOpacity>
                                </ThemedView>
                            ))}
                            <ThemedView style={[styles.flexRow, styles.progressBar]}>
                                <ThemedText style={{ color: 'white' }}>Add</ThemedText>
                                <TouchableOpacity onPress={handleAddChild}>
                                    <ThemedView style={styles.categoryEditIconContainer}>
                                        <Image source={plusIcon} style={styles.categoryEditIcon}></Image>
                                    </ThemedView>
                                </TouchableOpacity>
                            </ThemedView>

                        </ScrollView>
                        {/* Modal for adding category/child */}
                        {modalVisible && (
                            <ThemedView style={{
                                position: 'absolute',
                                top: -50,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 1000
                            }}>
                                <ThemedView style={{ backgroundColor: '#053B4A', borderRadius: 16, borderColor: '#add7da4d', borderWidth: 1, padding: 24, width: 300, minHeight: 200 }}>
                                    <ThemedText style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16, color: 'white' }}>
                                        {modalType === 'category' ? 'Add Learning Category' : 'Add Child'}
                                    </ThemedText>
                                    <ScrollView horizontal style={{ maxHeight: 300 }}>
                                        <ThemedView style={{ flexDirection: 'row', gap: 10 }}>
                                            {modalType === 'category' && allCategories.filter(cat => !categories.some(c => c.id === cat.id)).map(cat => (
                                                <LearningTargetCard
                                                    key={cat.id}
                                                    target={{ ...cat, id: String(cat.id) }}
                                                    isSelected={categories.some(t => t.id === cat.id)}
                                                    onPress={() => handleTargetSelected({ id: String(cat.id), name: cat.name })}
                                                    checkIcon={checkIcon}
                                                    informationIcon={informationIcon}
                                                />
                                            ))}
                                            {modalType === 'child' && allChildren.filter(child => !children.some(kid => kid.id == child.id)).map(kid => (
                                                <ChildrenCard
                                                    key={kid.id}
                                                    child={kid}
                                                    isActive={children.includes(kid)}
                                                    onPress={() => handleChildSelected}
                                                />
                                            ))}
                                        </ThemedView>

                                    </ScrollView>
                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 24, alignSelf: 'flex-end' }}>
                                        <ThemedView style={{ backgroundColor: '#F4A672', padding: 8, paddingHorizontal: 30, borderRadius: 20 }}>
                                            <ThemedText style={{ fontWeight: 400, color: '#053B4A' }}>Close</ThemedText>
                                        </ThemedView>
                                    </TouchableOpacity>
                                </ThemedView>
                            </ThemedView>
                        )}
                    </ThemedView>
                </ThemedView>
            </ThemedView>
        </ThemedView >
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
    },
    container_detail: {
        marginTop: 36
    },
    overview: {
        paddingHorizontal: 20,
        marginBottom: 16,
        flexDirection: 'column',
        gap: 5
    },
    pathwayCard: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        borderRadius: 20,
        marginBottom: 20
    },
    focusEditCard: {
        marginHorizontal: 10,
        borderWidth: 4,
        borderColor: '#F4A672',
        borderRadius: 20,
        marginBottom: 20
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    subtitle: {
        color: '#9fd3c7',
        fontWeight: 700,
        fontSize: 20,
    },
    lengthContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 16,

    },
    lengthLabel: {
        color: '#9fd3c7',
        fontSize: 16,
        fontWeight: 600,
        marginRight: 8,
    },
    lengthText: {
        color: 'rgba(122, 193, 198, 1)',
        fontSize: 16,
        fontWeight: '400',
    },
    descriptionText: {
        color: 'rgba(122, 193, 198, 1)',
        fontSize: 14,
        fontWeight: '400',
    },
    categoryText: {
        color: 'white',
        borderColor: 'rgba(226, 158, 110, 1)',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        padding: 10
    },
    cardTextContainer: {
        padding: 5,
        paddingBottom: 30,
        borderBottomWidth: 1,
        borderColor: 'rgba(252, 252, 252, 0.2)',
    },
    cardSubtitle: {
        color: '#9fd3c7',
        fontSize: 14,
    },
    flexRow: {

        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    categoryEditBtn: {
        borderColor: 'rgba(226, 158, 110, 1)',
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        padding: 10
    },
    categoryEditText: {
        color: 'white',
    },
    categoryEditIcon: {
        width: 15,
        height: 15,
        tintColor: '#053B4A',
    },
    categoryEditIconContainer: {
        backgroundColor: '#9fd3c7',
        padding: 8,
        borderRadius: 8,


    },
    flexCol: {
        flexDirection: 'column',
        gap: 10
    },
    iconBtn: {
        padding: 3
    },
    iconBtnCircle: {
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        padding: 3,
        borderRadius: '50%'
    },
    backOrange: {
        backgroundColor: 'rgba(244, 166, 114, 1)'
    },
    scrollContainer: {
        padding: 16,
        alignItems: 'center',
    },
    card: {
        width: 240,
        height: 238,
        backgroundColor: '#003b4f',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        overflow: 'hidden',
        zIndex: -1
    },
    card2: {
        width: 240,
        height: 238,
        backgroundColor: '#003b4f',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        overflow: 'hidden',
        flexDirection: 'row',
        zIndex: -1
    },
    cardTop: {
        padding: 12,
    },
    cardTitle: {
        color: 'rgba(248, 236, 174, 1)',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 12
    },
    cardSubText: {
        color: '#9ec7d3',
        fontSize: 20,
        marginTop: 5,
    },
    cardImage: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
    },
    cardImage2: {
        width: '30%',
        height: '100%',
        resizeMode: 'cover',
    },
    connector: {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    circle1: {
        width: 10,
        height: 10,
        left: 0,
        transform: 'translate(-50%, 0)',
        position: 'absolute',
        borderRadius: 5,
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        zIndex: 2,
    },
    circle2: {
        width: 10,
        height: 10,
        right: 0,
        transform: 'translate(50%, 0)',
        position: 'absolute',
        borderRadius: 5,
        backgroundColor: 'rgba(5, 59, 74, 1)',
        borderWidth: 1,
        borderColor: 'rgba(248, 236, 174, 1)',
        zIndex: 2,
    },
    line: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(248, 236, 174, 1)',
        zIndex: 1,
    },
    storyContent: {
        padding: 12,
        width: '70%'
    },
    badge: {
        backgroundColor: '#003b4f',
        borderColor: '#69e2ec',
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        marginBottom: 4,
    },
    badgeText: {
        color: '#69e2ec',
        fontWeight: 'bold',
    },
    storyIndex: {
        color: '#ccc',
        fontSize: 12,
        marginBottom: 2,
    },
    storyLabel: {
        color: '#66e0d5',
        fontWeight: 'bold',
        fontSize: 13,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    storyTitle: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 4,
    },
    storyDuration: {
        color: '#ccc',
        fontSize: 12,
    },
    ButtonIcon: {
        width: 17,
        height: 17,

    },

    progressBar: {
        padding: 5,
        borderRadius: 30,
        borderWidth: 1,
        width: 90,
        borderColor: 'rgba(226, 158, 110, 1)',
    },
    avatarOutline: {
        width: 35,
        height: 35,
        backgroundColor: 'rgba(226, 158, 110, 1)',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'rgba(122, 193, 198, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 35,
        height: 35
    },
    checkAvatar: {
        width: 24,
        height: 24
    },
    name: {
        fontSize: 12,
        fontWeight: 700,
        lineHeight: 18,
        color: 'rgba(248, 236, 174, 1)',
    },
    bar: {
        width: 115,
        height: 4,
        borderRadius: 20,
        backgroundColor: 'rgba(248, 236, 174, 0.3)'
    },
    value: {
        fontSize: 14,
        fontWeight: 700,
        color: 'white'
    }
});