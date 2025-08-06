import { Image } from 'expo-image';
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface StoryProps {
  bgColor: string,
  textColor: string,
  subTextColor: string,
  progressColor: string,
  isBallonYellow: boolean,
  number: string,
  storyTitle: string,
  seriesTitle: string,
  duration: number,
  progress: number,
  image: string,
  featured: boolean,
  isFavorite: boolean,
  watched: boolean,
}

export function StoryCard({
  bgColor,
  textColor,
  subTextColor,
  progressColor,
  isBallonYellow,
  number,
  storyTitle,
  seriesTitle,
  duration,
  progress,
  image,
  featured,
  isFavorite,
  watched,
}: StoryProps) {
  const imageGen = (img: string) => {
    switch (img) {
      case "1":
        return require('@/assets/images/kid/story-back-1.png');
      case "2":
        return require('@/assets/images/kid/story-back-2.png');
      case "3":
        return require('@/assets/images/kid/story-back-3.png');
      default:
        return null;
    }
  };
  return (
    <ThemedView style={[styles.storyCard, { backgroundColor: bgColor }]}>
      <ThemedView style={styles.storyCardTopRow}>
        <ThemedText style={[styles.storyNumber, { color: textColor }]}>#{number}</ThemedText>
        <ThemedText style={[styles.storyLabel, { color: textColor }]}>Story</ThemedText>
        {
          <Image
            source={isFavorite ? 
                      require('@/assets/images/kid/icon-heart.png')
                    : require('@/assets/images/kid/icon-heart.png')
            }
            style={[styles.storyFavIcon, {tintColor: `${textColor}`}]}
          />
        }
      </ThemedView>
      <ThemedText style={[styles.storySeries, { color: subTextColor }]}>{seriesTitle}</ThemedText>
      <ThemedText style={[styles.storyTitle, { color: textColor }]}>{storyTitle}</ThemedText>
      <ThemedView style={styles.storyImageWrap}>
        {image && (<Image source={imageGen(image)} style={styles.storyImage} />)}
        <TouchableOpacity style={styles.storyPlayBtn}>
          <Image
            source={require('@/assets/images/kid/play-btn.png')}
            style={styles.storyPlayIcon}
          />
        </TouchableOpacity>
        <ThemedView style={{
          position: 'absolute',
          width: 48,
          height: 48,
          backgroundColor: subTextColor,
          top: -24,
          left: '50%',
          transform: 'translate(-24px, 0)',
          borderRadius: 24
        }}>
          <Image
            source={isBallonYellow ? require('@/assets/images/kid/yellow-ballon.png') : require('@/assets/images/kid/blue-ballon.png')}
            style={{ width: 48, height: 48 }}
            contentFit="cover"
          />
        </ThemedView>
      </ThemedView>
      {watched ? (
        <ThemedView style={styles.progressRow}>
          <Image
            source={require('@/assets/images/kid/icon-check.png')}
            contentFit="cover"
            style={[styles.checkIcon, {tintColor: `${textColor}`}]}
          />
          <ThemedText style={[styles.storyTime, { color: textColor }]}>Watched</ThemedText>

          <ThemedView style={[
            styles.progressBarFilled,
            { borderColor: textColor, backgroundColor: progressColor, flex: 1 }
          ]} />
        </ThemedView>
      ) : (
        <ThemedView style={styles.progressRow}>
          <ThemedText style={[styles.storyTime, { color: textColor }]}>{progress} min</ThemedText>
          <ThemedView style={styles.progressBarWrap}>
            <ThemedView style={[
              styles.progressBarFilled,
              { borderColor: textColor, backgroundColor: progressColor, width: `${progress * 100 / duration}%` }
            ]} />
            <ThemedView style={[
              styles.progressBarOutline,
              { borderColor: textColor, backgroundColor: bgColor, width: `${100 - progress * 100 / duration}%` }
            ]} />
          </ThemedView>
          <ThemedText style={[styles.storyTime, { color: textColor }]}>{duration - progress} min</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

interface SeriesInterface {
  title: string,
  count: number,
  image: string,
  isFavorite: boolean
}

export function SeriesCard({ title, count, image, isFavorite }: SeriesInterface) {
  const imageGen = (img: string) => {
    switch (img) {
      case "1":
        return require('@/assets/images/kid/series-back-1.png');
      case "2":
        return require('@/assets/images/kid/series-back-2.png');
      case "3":
        return require('@/assets/images/kid/series-back-3.png');
      case "4":
        return require('@/assets/images/kid/series-back-4.png');
      case "5":
        return require('@/assets/images/kid/series-back-5.png');
      default:
        return null;
    }
  };
  return (
    <ThemedView style={styles.seriesCard}>
      <ThemedView style={styles.favActiveCircle}></ThemedView>
      {isFavorite && (
        <Image
          source={require('@/assets/images/kid/icon-heart.png')}
          style={[styles.storyFavIcon, { position: 'absolute', top: 20, right: 22 }]}
        />
      )}
      <ThemedText style={styles.seriesLabel}>Series</ThemedText>

      <ThemedText style={styles.seriesTitle}>{title}</ThemedText>
      <Image source={imageGen(image)} style={styles.seriesImage} />
      <ThemedText style={styles.seriesCount}>{count} Stories</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Card styles for StoryCard and SeriesCard
  storyCard: {
    width: 290,
    borderRadius: 10,
    padding: 0,
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    marginBottom: 8,
    position: 'relative',
    display: 'flex'
  },
  storyCardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 2,
    justifyContent: "space-between",
  },
  storyNumber: {
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 30,
  },
  storyLabel: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  storyFavIcon: {
    width: 20,
    height: 20,
    marginLeft: 4,
  },
  storySeries: {
    color: '#F8ECAE',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
  },
  storyImageWrap: {
    position: "relative",
  },
  storyImage: {
    width: '100%',
    height: 200,
    backgroundColor: "#eee",
  },
  storyPlayBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -32,
    marginTop: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F8ECAE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#053B4A",
    elevation: 2,
  },
  storyPlayIcon: {
    width: 90,
    height: 90,
  },
  storyTitle: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 36,
    flexGrow: 1
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    padding: 10,
    gap: 12
  },
  checkIcon: {
    width: 20,
    height: 20,
  },
  storyTime: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20
  },
  progressBarWrap: {
    width: 150,
    flexDirection: 'row',
    height: 15,
    alignItems: 'center',
    gap: 2,
  },
  progressBarFilled: {
    height: 15,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "#ADD7DA",
    borderColor: "#053B4A",
  },
  progressBarOutline: {
    height: 15,
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "transparent",
    borderColor: "#053B4A",
  },
  seriesCard: {
    width: 290,
    borderRadius: 10,
    marginRight: 8,
    backgroundColor: "#FCFCFC",
    borderWidth: 1,
    borderColor: "#ADD7DA",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: "flex-start",
    marginBottom: 8,
    position: 'relative',
    display: 'flex'
  },
  seriesLabel: {
    fontSize: 16,
    fontWeight: "400",
    color: "#053B4A",
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 19,
    textAlign: 'center'
  },
  seriesTitle: {
    flexGrow: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#048F99",
    textTransform: "uppercase",
    lineHeight: 24,
    marginBottom: 38,
    textAlign: 'center'
  },
  seriesImage: {
    width: '100%',
    height: 260,
    alignSelf: "center",
    backgroundColor: "#eee",
  },
  seriesCount: {
    fontSize: 16,
    color: "#053B4A",
    fontWeight: "400",
    lineHeight: 24,
    textAlign: "center",
    marginVertical: 10
  },
  favActiveCircle: {
    position: 'absolute',
    width: 17,
    height: 17,
    top: 21,
    right: 20,
    backgroundColor: "#F4A672",
    borderRadius: 17,
  },
});