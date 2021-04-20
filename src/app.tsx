import React, {useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import StoryRow from './storyRow';
import {connect} from 'react-redux';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fetchStories} from './redux/actions';

declare type AppProps = {
  topStoriesReducer: TopStoriesState;
  fetchStories?: () => void;
};

const App = (props: AppProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    if (props.fetchStories) {
      props.fetchStories();
    }
  }, []);

  const renderBody = () =>
    props.topStoriesReducer.error ? (
      <View style={styles.container}>
        <Text style={styles.centeredText}>
          {`${props.topStoriesReducer.error}`}
        </Text>
      </View>
    ) : (
      renderContent()
    );

  const renderContent = () =>
    props.topStoriesReducer.isFetching ? (
      <View style={styles.container}>
        {<Text style={styles.centeredText}>Fetching Stories</Text>}
      </View>
    ) : (
      <FlatList
        style={{flex: 1}}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, backgroundColor: 'grey'}} />
        )}
        data={props.topStoriesReducer.topStories}
        keyExtractor={(item: HNItem) => `${item.id}`}
        renderItem={({item}) => <StoryRow item={item} />}
      />
    );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderBody()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  centeredText: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
});

const mapStateToProps = (state: AppState): AppProps => {
  return {
    topStoriesReducer: state.topStoriesReducer,
  };
};

export default connect(mapStateToProps, {
  fetchStories,
})(App);
