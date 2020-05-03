import React from 'react';
import { Image, ImageStyle, ScrollView, Text, View } from 'react-native';
import { useTheme } from 'react-native-themed-styles';
import { GoogleBook } from '../api/books';
import { NavigationComponent } from '../navigation';
import { styleSheetFactory } from '../themes';

interface BookDetailsProps {
  book: GoogleBook;
}

const themedStyles = styleSheetFactory(theme => ({
  cover: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    height: 250,
  },
  coverTitles: {
    paddingLeft: 8,
    paddingRight: 16,
    flex: 1,
  },
  coverBackground: {
    width: '100%',
    height: 250,
    position: 'absolute'
  },
  coverImage: {
    width: 150,
    height: 200,
    marginLeft: 8,
  },
  coverTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.textColor,
  },
  coverSubtitle: {
    color: theme.textColor,
  },
  coverDescription: {
    marginTop: 8,
    fontSize: 12,
    color: theme.textColor,
    overflow: 'hidden',
  },
}));

const BookDetails: NavigationComponent<BookDetailsProps> = ({book}) => {
  const [styles] = useTheme(themedStyles);

  return (
    <ScrollView>
      <View style={styles.cover}>
        <Image
          source={{uri: book.volumeInfo.imageLinks.thumbnail}}
          resizeMode="cover"
          blurRadius={10}
          style={styles.coverBackground as ImageStyle} // @TODO: Fix this 
        />
        <Image
          source={{uri: book.volumeInfo.imageLinks.thumbnail}}
          resizeMode="contain"
          style={styles.coverImage as ImageStyle} // @TODO: Fix this 
        />
        <View style={styles.coverTitles}>
          <Text style={styles.coverTitle}>{book.volumeInfo.title}</Text>
          <Text style={styles.coverSubtitle}>
            By {book.volumeInfo.authors.join(', ')}
          </Text>
          <Text
            style={styles.coverDescription}
            numberOfLines={10}
            textBreakStrategy="simple"
            ellipsizeMode="tail">
            {book.volumeInfo.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

BookDetails.options = props => ({
  topBar: {
    title: {
      text: props?.book.volumeInfo.title ?? 'Unknown',
    },
  },
});

export default BookDetails;
