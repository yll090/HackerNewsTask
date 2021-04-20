import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type StoryRowType = {
  item: HNItem;
};

const StoryRow = (props: StoryRowType) => {
  return props.item ? (
    <View style={styles.container}>
      <View style={styles.authorContainer}>
        <Text style={styles.score}>{props.item.score}</Text>
        <Text style={styles.title}>{props.item.title}</Text>
      </View>
      <Text style={styles.url}>{props.item.url}</Text>
      <View style={styles.urlAndScore}>
        <Text style={styles.smallText}>{`${new Date(
          props.item.time * 1000,
        ).toDateString()}`}</Text>
        <View style={styles.authorContainer}>
          <Text
            style={
              styles.smallText
            }>{`By: ${props.item.author.id}, ${props.item.author.karma} karma`}</Text>
        </View>
      </View>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  title: {
    fontSize: 14,
    flex: 1,
  },
  smallText: {
    fontSize: 10,
  },
  url: {
    fontSize: 8,
    paddingTop: 5,
  },
  score: {
    fontSize: 12,
    paddingEnd: 10,
    alignSelf: 'center',
    alignContent: 'flex-start',
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  urlAndScore: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StoryRow;
