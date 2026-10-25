
import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = 'Study' | 'Personal' | 'Work' | 'Ideas';
type Screen = 'Home' | 'Favorites' | 'Settings' | 'Detail';

type Note = {
  id: string;
  title: string;
  content: string;
  category: Category;
  favorite: boolean;
  updatedAt: number;
};

const categories: Category[] = ['Study', 'Personal', 'Work', 'Ideas'];

const emoji: Record<Category, string> = {
  Study: '📚',
  Personal: '🌸',
  Work: '💼',
  Ideas: '💡',
};

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'React Native Roadmap',
    content:
      'Components, props, state, hooks, navigation and API integration. Practice a little every day.',
    category: 'Ideas',
    favorite: true,
    updatedAt: Date.now(),
  },
  {
    id: '2',
    title: 'Weekend Goals',
    content:
      'Finish the NoteFlow home screen, revise TypeScript and organize project folders.',
    category: 'Work',
    favorite: false,
    updatedAt: Date.now() - 60000,
  },
  {
    id: '3',
    title: 'Study Plan',
    content:
      'Revise React Native components, practice coding and review the notes from class.',
    category: 'Study',
    favorite: true,
    updatedAt: Date.now() - 120000,
  },
];

const light = {
  bg: '#F6F5FB',
  card: '#FFFFFF',
  text: '#25243B',
  muted: '#85849B',
  border: '#E8E6F1',
  primary: '#6955E8',
  soft: '#EEEAFE',
  danger: '#D94258',
};

const dark = {
  bg: '#151522',
  card: '#222235',
  text: '#F6F4FF',
  muted: '#AAA8C0',
  border: '#38374D',
  primary: '#A294FF',
  soft: '#36314F',
  danger: '#FF8295',
};

export default function App() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [screen, setScreen] = useState<Screen>('Home');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | 'All'>('All');
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editCategory, setEditCategory] =
    useState<Category>('Personal');

  const c = darkMode ? dark : light;
  const s = useMemo(() => makeStyles(c), [c]);

  const selectedNote =
    notes.find(note => note.id === selectedId) ?? null;

  const shownNotes = notes
    .filter(note => screen !== 'Favorites' || note.favorite)
    .filter(note => filter === 'All' || note.category === filter)
    .filter(note => {
      const q = query.trim().toLowerCase();
      return (
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.updatedAt - a.updatedAt);

  function goHome() {
    setScreen('Home');
    setSelectedId(null);
    setFilter('All');
  }

  function openNote(note: Note) {
    setSelectedId(note.id);
    setScreen('Detail');
  }

  function openEditor(note?: Note) {
    setEditingId(note?.id ?? null);
    setTitle(note?.title ?? '');
    setContent(note?.content ?? '');
    setEditCategory(note?.category ?? 'Personal');
    setEditorOpen(true);
  }

  function saveNote() {
    if (!title.trim() || !content.trim()) {
      Alert.alert(
        'Complete your note',
        'Please enter both a title and some content.',
      );
      return;
    }

    const now = Date.now();

    if (editingId) {
      setNotes(old =>
        old.map(note =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                content: content.trim(),
                category: editCategory,
                updatedAt: now,
              }
            : note,
        ),
      );
    } else {
      const newNote: Note = {
        id: `${now}-${Math.random()}`,
        title: title.trim(),
        content: content.trim(),
        category: editCategory,
        favorite: false,
        updatedAt: now,
      };

      setNotes(old => [newNote, ...old]);
      setSelectedId(newNote.id);
      setScreen('Detail');
    }

    setEditorOpen(false);
  }

  function toggleFavorite(id: string) {
    setNotes(old =>
      old.map(note =>
        note.id === id
          ? { ...note, favorite: !note.favorite }
          : note,
      ),
    );
  }

  function deleteNote() {
    if (!selectedNote) return;

    Alert.alert('Delete note?', 'This action cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setNotes(old =>
            old.filter(note => note.id !== selectedNote.id),
          );
          setSelectedId(null);
          setScreen('Home');
        },
      },
    ]);
  }

  function dateLabel(timestamp: number) {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  }

  function navButton(
    name: 'Home' | 'Favorites' | 'Settings',
    icon: string,
  ) {
    const active = screen === name;

    return (
      <Pressable
        key={name}
        onPress={() => setScreen(name)}
        style={s.navItem}
        accessibilityRole="button"
        accessibilityLabel={name}
      >
        <Text style={[s.navIcon, active && s.navActive]}>{icon}</Text>
        <Text style={[s.navLabel, active && s.navActive]}>
          {name}
        </Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <StatusBar
        backgroundColor={c.bg}
        barStyle={darkMode ? 'light-content' : 'dark-content'}
      />

      <View style={s.app}>
        {/* MAIN HEADER */}
        <View style={s.header}>
          {screen === 'Detail' ? (
            <Pressable onPress={goHome} style={s.backButton}>
              <Text style={s.backText}>‹</Text>
            </Pressable>
          ) : (
            <View style={s.brandIcon}>
              <Text style={s.brandIconText}>N</Text>
            </View>
          )}

          <Pressable
            style={s.brandArea}
            onPress={goHome}
            accessibilityLabel="Go to Home"
          >
            <Text style={s.brand}>NoteFlow</Text>
            <Text style={s.brandSub}>YOUR PERSONAL SPACE</Text>
          </Pressable>

          <Pressable
            onPress={() => setDarkMode(value => !value)}
            style={s.themeButton}
            accessibilityLabel="Toggle theme"
          >
            <Text style={s.themeIcon}>{darkMode ? '☀️' : '🌙'}</Text>
          </Pressable>
        </View>

        {/* HOME AND FAVORITES */}
        {(screen === 'Home' || screen === 'Favorites') && (
          <ScrollView
            style={s.flex}
            contentContainerStyle={s.page}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={s.hero}>
              <View style={s.heroText}>
                <Text style={s.eyebrow}>
                  {screen === 'Home' ? 'YOUR WORKSPACE' : 'SAVED FOR LATER'}
                </Text>
                <Text style={s.heading}>
                  {screen === 'Home' ? 'Your thoughts,' : 'Your'} 
                </Text>
                <Text style={[s.heading, s.headingAccent]}>
                  {screen === 'Home' ? 'in good flow.' : 'favorites.'}
                </Text>
                <Text style={s.description}>
                  {screen === 'Home'
                    ? 'Capture ideas. Stay organized.'
                    : 'All your favorite notes in one place.'}
                </Text>
              </View>

              <View style={s.heroDecoration}>
                <Text style={s.heroEmoji}>✎</Text>
              </View>
            </View>

            <View style={s.statsRow}>
              <View style={s.statCard}>
                <Text style={s.statNumber}>{notes.length}</Text>
                <Text style={s.statLabel}>Total notes</Text>
              </View>
              <View style={s.statCard}>
                <Text style={s.statNumber}>
                  {notes.filter(n => n.favorite).length}
                </Text>
                <Text style={s.statLabel}>Favorites</Text>
              </View>
              <View style={s.statCard}>
                <Text style={s.statNumber}>
                  {new Set(notes.map(n => n.category)).size}
                </Text>
                <Text style={s.statLabel}>Categories</Text>
              </View>
            </View>

            <View style={s.search}>
              <Text style={s.searchIcon}>⌕</Text>
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search notes or ideas..."
                placeholderTextColor={c.muted}
                style={s.searchInput}
                returnKeyType="search"
              />
              {query.length > 0 && (
                <Pressable onPress={() => setQuery('')}>
                  <Text style={s.clearSearch}>×</Text>
                </Pressable>
              )}
            </View>

            <View style={s.sectionHeader}>
              <View>
                <Text style={s.sectionTitle}>Categories</Text>
                <Text style={s.sectionSub}>Find notes by topic</Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={s.categoryList}
            >
              {(['All', ...categories] as const).map(item => {
                const active = filter === item;
                return (
                  <Pressable
                    key={item}
                    onPress={() => setFilter(item)}
                    style={[s.chip, active && s.chipActive]}
                  >
                    <Text
                      style={[s.chipText, active && s.chipTextActive]}
                    >
                      {item === 'All' ? '✦ All' : `${emoji[item]} ${item}`}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>

            <View style={s.notesHeader}>
              <View>
                <Text style={s.sectionTitle}>
                  {screen === 'Favorites' ? 'Favorite notes' : 'Recent notes'}
                </Text>
                <Text style={s.sectionSub}>
                  {shownNotes.length} notes · Latest first
                </Text>
              </View>

              <Pressable
                onPress={() => openEditor()}
                style={s.newButton}
              >
                <Text style={s.newButtonText}>＋ New</Text>
              </Pressable>
            </View>

            {shownNotes.length === 0 ? (
              <View style={s.empty}>
                <Text style={s.emptyIcon}>✎</Text>
                <Text style={s.emptyTitle}>No notes found</Text>
                <Text style={s.emptySub}>
                  Try another filter or create a new note.
                </Text>
                <Pressable
                  onPress={() => openEditor()}
                  style={s.primaryButton}
                >
                  <Text style={s.primaryButtonText}>Create a note</Text>
                </Pressable>
              </View>
            ) : (
              shownNotes.map((note, index) => (
                <Pressable
                  key={note.id}
                  onPress={() => openNote(note)}
                  style={s.noteCard}
                >
                  <View style={s.noteTop}>
                    <View style={s.noteCategory}>
                      <Text style={s.noteCategoryText}>
                        {emoji[note.category]} {note.category}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => toggleFavorite(note.id)}
                      hitSlop={10}
                      accessibilityLabel="Toggle favorite"
                    >
                      <Text
                        style={[
                          s.heart,
                          note.favorite && s.heartActive,
                        ]}
                      >
                        {note.favorite ? '♥' : '♡'}
                      </Text>
                    </Pressable>
                  </View>

                  <Text style={s.noteTitle}>{note.title}</Text>
                  <Text style={s.noteContent} numberOfLines={3}>
                    {note.content}
                  </Text>

                  <View style={s.noteFooter}>
                    <Text style={s.noteDate}>
                      {dateLabel(note.updatedAt)}
                    </Text>
                    <Text style={s.openHint}>Open note ↗</Text>
                  </View>
                </Pressable>
              ))
            )}

            <View style={{ height: 24 }} />
          </ScrollView>
        )}

        {/* NOTE DETAILS */}
        {screen === 'Detail' && (
          <View style={s.flex}>
            {selectedNote ? (
              <ScrollView
                contentContainerStyle={s.detailPage}
                showsVerticalScrollIndicator={false}
              >
                <View style={s.detailActions}>
                  <Pressable onPress={goHome} style={s.homePill}>
                    <Text style={s.homePillText}>⌂  Back to Home</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => toggleFavorite(selectedNote.id)}
                    style={s.detailHeart}
                  >
                    <Text style={s.heart}>
                      {selectedNote.favorite ? '♥' : '♡'}
                    </Text>
                  </Pressable>
                </View>

                <View style={s.detailCategory}>
                  <Text style={s.detailCategoryText}>
                    {emoji[selectedNote.category]} {selectedNote.category}
                  </Text>
                </View>

                <Text style={s.detailTitle}>{selectedNote.title}</Text>
                <Text style={s.detailDate}>
                  Last updated {dateLabel(selectedNote.updatedAt)}
                </Text>

                <View style={s.detailDivider} />

                <Text style={s.detailContent}>{selectedNote.content}</Text>

                <Pressable
                  onPress={() => openEditor(selectedNote)}
                  style={s.primaryButton}
                >
                  <Text style={s.primaryButtonText}>✎  Edit note</Text>
                </Pressable>

                <Pressable
                  onPress={deleteNote}
                  style={s.deleteButton}
                >
                  <Text style={s.deleteText}>Delete note</Text>
                </Pressable>
              </ScrollView>
            ) : (
              <View style={s.empty}>
                <Text style={s.emptyTitle}>Note not found</Text>
                <Pressable onPress={goHome} style={s.primaryButton}>
                  <Text style={s.primaryButtonText}>Go to Home</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}

        {/* SETTINGS */}
        {screen === 'Settings' && (
          <ScrollView contentContainerStyle={s.page}>
            <Text style={s.heading}>Settings</Text>
            <Text style={s.description}>
              Make NoteFlow feel like yours.
            </Text>

            <View style={s.settingRow}>
              <View style={s.settingIcon}>
                <Text style={{ fontSize: 20 }}>🌙</Text>
              </View>
              <View style={s.settingText}>
                <Text style={s.settingTitle}>Dark appearance</Text>
                <Text style={s.settingSub}>
                  Use a darker color scheme
                </Text>
              </View>
              <Pressable
                onPress={() => setDarkMode(value => !value)}
                style={[s.toggle, darkMode && s.toggleActive]}
              >
                <View
                  style={[
                    s.toggleKnob,
                    darkMode && s.toggleKnobActive,
                  ]}
                />
              </Pressable>
            </View>

            <View style={s.settingRow}>
              <View style={s.settingIcon}>
                <Text style={{ fontSize: 20 }}>📝</Text>
              </View>
              <View style={s.settingText}>
                <Text style={s.settingTitle}>Your notes</Text>
                <Text style={s.settingSub}>
                  {notes.length} notes created in this session
                </Text>
              </View>
            </View>

            <View style={s.aboutCard}>
              <View style={s.brandIcon}>
                <Text style={s.brandIconText}>N</Text>
              </View>
              <Text style={s.aboutTitle}>NoteFlow</Text>
              <Text style={s.aboutSub}>
                A calmer place for your thoughts.
              </Text>
              <Text style={s.version}>Version 1.0 · Learning project</Text>
            </View>
          </ScrollView>
        )}

        {/* ALWAYS VISIBLE BOTTOM NAVIGATION */}
        <View style={s.bottomBar}>
          {navButton('Home', '⌂')}

          <Pressable
            onPress={() => openEditor()}
            style={s.fab}
            accessibilityLabel="Create new note"
          >
            <Text style={s.fabText}>＋</Text>
          </Pressable>

          {navButton('Favorites', '♡')}
          {navButton('Settings', '⚙')}
        </View>
      </View>

      {/* CREATE / EDIT MODAL */}
      <Modal
        visible={editorOpen}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setEditorOpen(false)}
      >
        <SafeAreaView style={s.safe}>
          <KeyboardAvoidingView
            style={s.editorScreen}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={s.editorHeader}>
              <Pressable onPress={() => setEditorOpen(false)}>
                <Text style={s.cancelText}>Cancel</Text>
              </Pressable>

              <Text style={s.editorHeading}>
                {editingId ? 'Edit note' : 'New note'}
              </Text>

              <Pressable onPress={saveNote} style={s.saveButton}>
                <Text style={s.saveText}>Save</Text>
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={s.editorContent}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={s.fieldLabel}>NOTE TITLE</Text>
              <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Give your note a title"
                placeholderTextColor={c.muted}
                style={s.titleInput}
                maxLength={100}
                autoFocus
              />

              <Text style={s.fieldLabel}>CATEGORY</Text>
              <View style={s.editorCategories}>
                {categories.map(item => (
                  <Pressable
                    key={item}
                    onPress={() => setEditCategory(item)}
                    style={[
                      s.chip,
                      editCategory === item && s.chipActive,
                    ]}
                  >
                    <Text
                      style={[
                        s.chipText,
                        editCategory === item && s.chipTextActive,
                      ]}
                    >
                      {emoji[item]} {item}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={s.fieldLabel}>YOUR THOUGHTS</Text>
              <TextInput
                value={content}
                onChangeText={setContent}
                placeholder="Start writing your thoughts..."
                placeholderTextColor={c.muted}
                multiline
                textAlignVertical="top"
                style={s.contentInput}
              />

              <Text style={s.characterCount}>
                {content.length} characters
              </Text>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function makeStyles(c: typeof light) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.bg },
    app: { flex: 1, backgroundColor: c.bg },
    flex: { flex: 1 },
    page: { paddingHorizontal: 21, paddingTop: 14, paddingBottom: 25 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 21,
      paddingVertical: 12,
      gap: 11,
    },
    brandIcon: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: c.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    brandIconText: { color: '#FFFFFF', fontSize: 23, fontWeight: '900' },
    brandArea: { flex: 1 },
    brand: { color: c.text, fontSize: 20, fontWeight: '900' },
    brandSub: {
      color: c.muted,
      fontSize: 8,
      letterSpacing: 1.5,
      marginTop: 2,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: c.card,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: c.border,
    },
    backText: { fontSize: 34, color: c.text, lineHeight: 38 },
    themeButton: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    themeIcon: { fontSize: 18 },
    hero: {
      backgroundColor: c.soft,
      borderRadius: 24,
      padding: 21,
      minHeight: 168,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      marginBottom: 17,
    },
    heroText: { flex: 1 },
    eyebrow: {
      fontSize: 9,
      letterSpacing: 1.7,
      color: c.primary,
      fontWeight: '900',
      marginBottom: 10,
    },
    heading: {
      color: c.text,
      fontSize: 27,
      fontWeight: '900',
      letterSpacing: -0.8,
      lineHeight: 32,
    },
    headingAccent: { color: c.primary },
    description: {
      color: c.muted,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 10,
    },
    heroDecoration: {
      width: 65,
      height: 80,
      borderRadius: 22,
      backgroundColor: c.card,
      alignItems: 'center',
      justifyContent: 'center',
      transform: [{ rotate: '8deg' }],
      marginLeft: 5,
    },
    heroEmoji: { fontSize: 39, color: c.primary },
    statsRow: { flexDirection: 'row', gap: 9, marginBottom: 18 },
    statCard: {
      flex: 1,
      backgroundColor: c.card,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: c.border,
      padding: 13,
    },
    statNumber: { color: c.text, fontSize: 23, fontWeight: '900' },
    statLabel: { color: c.muted, fontSize: 10, marginTop: 4 },
    search: {
      height: 51,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 14,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 15,
      marginBottom: 25,
    },
    searchIcon: { fontSize: 27, color: c.muted, marginRight: 10 },
    searchInput: { flex: 1, color: c.text, fontSize: 14, paddingVertical: 0 },
    clearSearch: { color: c.muted, fontSize: 24, paddingHorizontal: 4 },
    sectionHeader: { marginBottom: 12 },
    sectionTitle: { fontSize: 17, fontWeight: '900', color: c.text },
    sectionSub: { color: c.muted, fontSize: 11, marginTop: 4 },
    categoryList: { gap: 8, paddingBottom: 25 },
    chip: {
      paddingHorizontal: 13,
      paddingVertical: 10,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.border,
      backgroundColor: c.card,
    },
    chipActive: { backgroundColor: c.primary, borderColor: c.primary },
    chipText: { color: c.text, fontSize: 12, fontWeight: '700' },
    chipTextActive: { color: '#FFFFFF' },
    notesHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    newButton: {
      paddingHorizontal: 13,
      paddingVertical: 10,
      borderRadius: 12,
      backgroundColor: c.soft,
    },
    newButtonText: { color: c.primary, fontSize: 12, fontWeight: '900' },
    noteCard: {
      padding: 17,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 19,
      marginBottom: 12,
    },
    noteTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    noteCategory: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 9,
      backgroundColor: c.soft,
    },
    noteCategoryText: { color: c.primary, fontSize: 11, fontWeight: '800' },
    heart: { color: c.muted, fontSize: 26 },
    heartActive: { color: '#E44E79' },
    noteTitle: {
      color: c.text,
      fontSize: 17,
      fontWeight: '900',
      marginBottom: 7,
    },
    noteContent: { color: c.muted, fontSize: 13, lineHeight: 21 },
    noteFooter: {
      borderTopWidth: 1,
      borderTopColor: c.border,
      marginTop: 14,
      paddingTop: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    noteDate: { color: c.muted, fontSize: 10 },
    openHint: { color: c.primary, fontSize: 10, fontWeight: '800' },
    empty: {
      padding: 28,
      alignItems: 'center',
      backgroundColor: c.card,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border,
    },
    emptyIcon: { color: c.primary, fontSize: 42 },
    emptyTitle: {
      color: c.text,
      fontSize: 18,
      fontWeight: '900',
      marginTop: 8,
    },
    emptySub: {
      color: c.muted,
      fontSize: 13,
      textAlign: 'center',
      marginTop: 7,
      marginBottom: 18,
    },
    primaryButton: {
      backgroundColor: c.primary,
      paddingHorizontal: 19,
      paddingVertical: 13,
      borderRadius: 13,
      alignItems: 'center',
      marginTop: 22,
    },
    primaryButtonText: { color: '#FFFFFF', fontWeight: '900', fontSize: 13 },
    bottomBar: {
      minHeight: 72,
      backgroundColor: c.card,
      borderTopWidth: 1,
      borderTopColor: c.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingHorizontal: 8,
      paddingBottom: 4,
    },
    navItem: {
      minWidth: 58,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
    },
    navIcon: { color: c.muted, fontSize: 24 },
    navActive: { color: c.primary, fontWeight: '900' },
    navLabel: { color: c.muted, fontSize: 9, fontWeight: '700' },
    fab: {
      width: 49,
      height: 49,
      borderRadius: 17,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.primary,
      marginTop: -22,
      borderWidth: 4,
      borderColor: c.bg,
    },
    fabText: { color: '#FFFFFF', fontSize: 29, lineHeight: 32 },
    detailPage: { padding: 22, paddingBottom: 35 },
    detailActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
    },
    homePill: {
      backgroundColor: c.soft,
      paddingHorizontal: 15,
      paddingVertical: 11,
      borderRadius: 12,
    },
    homePillText: { color: c.primary, fontSize: 13, fontWeight: '900' },
    detailHeart: {
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.border,
    },
    detailCategory: {
      alignSelf: 'flex-start',
      backgroundColor: c.soft,
      borderRadius: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      marginBottom: 17,
    },
    detailCategoryText: { color: c.primary, fontSize: 12, fontWeight: '800' },
    detailTitle: {
      color: c.text,
      fontSize: 31,
      lineHeight: 39,
      fontWeight: '900',
      letterSpacing: -0.7,
    },
    detailDate: { color: c.muted, fontSize: 12, marginTop: 10 },
    detailDivider: {
      height: 1,
      backgroundColor: c.border,
      marginVertical: 25,
    },
    detailContent: { color: c.text, fontSize: 16, lineHeight: 28 },
    deleteButton: {
      borderWidth: 1,
      borderColor: c.danger,
      padding: 14,
      borderRadius: 13,
      alignItems: 'center',
      marginTop: 13,
    },
    deleteText: { color: c.danger, fontSize: 13, fontWeight: '800' },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: c.card,
      borderRadius: 17,
      borderWidth: 1,
      borderColor: c.border,
      padding: 15,
      marginTop: 13,
    },
    settingIcon: {
      width: 43,
      height: 43,
      backgroundColor: c.soft,
      borderRadius: 13,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingText: { flex: 1, marginLeft: 12 },
    settingTitle: { color: c.text, fontSize: 14, fontWeight: '800' },
    settingSub: { color: c.muted, fontSize: 11, marginTop: 5 },
    toggle: {
      width: 45,
      height: 26,
      borderRadius: 15,
      backgroundColor: c.border,
      padding: 3,
      justifyContent: 'center',
    },
    toggleActive: { backgroundColor: c.primary },
    toggleKnob: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
    },
    toggleKnobActive: { alignSelf: 'flex-end' },
    aboutCard: {
      alignItems: 'center',
      backgroundColor: c.card,
      borderRadius: 20,
      padding: 24,
      marginTop: 25,
      borderWidth: 1,
      borderColor: c.border,
    },
    aboutTitle: {
      color: c.text,
      fontSize: 20,
      fontWeight: '900',
      marginTop: 12,
    },
    aboutSub: { color: c.muted, fontSize: 12, marginTop: 5 },
    version: { color: c.muted, fontSize: 10, marginTop: 20 },
    editorScreen: { flex: 1, backgroundColor: c.bg },
    editorHeader: {
      height: 62,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    cancelText: { color: c.muted, fontSize: 14 },
    editorHeading: { color: c.text, fontSize: 17, fontWeight: '900' },
    saveButton: {
      backgroundColor: c.primary,
      paddingHorizontal: 17,
      paddingVertical: 10,
      borderRadius: 11,
    },
    saveText: { color: '#FFFFFF', fontSize: 13, fontWeight: '900' },
    editorContent: { padding: 22, paddingBottom: 45 },
    fieldLabel: {
      color: c.muted,
      fontSize: 10,
      fontWeight: '900',
      letterSpacing: 1.3,
      marginTop: 25,
      marginBottom: 12,
    },
    titleInput: {
      color: c.text,
      fontSize: 24,
      fontWeight: '800',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    editorCategories: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    contentInput: {
      minHeight: 230,
      backgroundColor: c.card,
      color: c.text,
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: 16,
      padding: 15,
      fontSize: 15,
      lineHeight: 24,
    },
    characterCount: {
      color: c.muted,
      fontSize: 11,
      textAlign: 'right',
      marginTop: 8,
    },
  });
}
