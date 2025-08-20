import { Image } from 'expo-image';
import React, { useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";


const { width } = Dimensions.get('window');

interface RecentProps {
  storyId: string;
  stories: {
    seriesCategory: string,
    storyTitle: string,
  };
  image: string,
  isFavourite: boolean,
  duration?: number,
  played?: number,
  watched?: boolean,
}

interface CardStyle {
  bgColor: string,
  textColor: string,
  subTextColor: string,
  progressColor: string,
  isBallonYellow: boolean,
}


const cardStyles = [
  {
    bgColor: "#053B4A",
    textColor: "#FCFCFC",
    subTextColor: "#F8ECAE",
    progressColor: "#F8ECAE",
    isBallonYellow: false,
  },
  {
    bgColor: "#F4A672",
    textColor: "#053B4A",
    subTextColor: "#F8ECAE",
    progressColor: "#ADD7DA",
    isBallonYellow: true,
  },
  {
    bgColor: "#F8ECAE",
    textColor: "#053B4A",
    subTextColor: "#048F99",
    progressColor: "#ADD7DA",
    isBallonYellow: false,
  }]



export function StoryCard({ num, recent, onPlay }: { num: number, recent: RecentProps, onPlay?: (id: string) => void }) {
  // Use a consistent style based on the story index
  const styleIdx = num % cardStyles.length;
  const style = cardStyles[styleIdx];

  function FromSec(seconds: number): string {

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec}`;
  }

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
    <ThemedView style={[styles.storyCard, { backgroundColor: style.bgColor }]}>
      <ThemedView>
        <ThemedView style={{ height: 180 }}>
          <ThemedView style={styles.storyCardTopRow}>
            <ThemedText style={[styles.storyNumber, { color: style.textColor }]}>#{num}</ThemedText>
            <ThemedText style={[styles.storyLabel, { color: style.textColor }]}>Story</ThemedText>
            {
              <Image
                source={recent.isFavourite ?
                  require('@/assets/images/kid/icon-heart.png')
                  : require('@/assets/images/kid/icon-heart.png')
                }
                style={[styles.storyFavIcon, { tintColor: `${style.textColor}` }]}
              />
            }
          </ThemedView>
          <ThemedText style={[styles.storySeries, { color: style.subTextColor }]}>{recent.stories.seriesCategory}</ThemedText>
          <ThemedText style={[styles.storyTitle, { color: style.textColor }]}>{recent.stories.storyTitle}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.storyImageWrap}>
          <Image source={recent.image ? imageGen(recent.image) : require('@/assets/images/kid/story-back-1.png')} style={styles.storyImage} />
          <TouchableOpacity style={styles.storyPlayBtn} onPress={() => onPlay && onPlay(recent.storyId)}>
            <Image
              source={require('@/assets/images/kid/play-btn.png')}
              style={styles.storyPlayIcon}
            />
          </TouchableOpacity>
          <ThemedView style={{
            position: 'absolute',
            width: 48,
            height: 48,
            backgroundColor: style.subTextColor,
            top: -24,
            left: '50%',
            transform: 'translate(-24px, 0)',
            borderRadius: 24
          }}>
            <Image
              source={style.isBallonYellow ? require('@/assets/images/kid/yellow-ballon.png') : require('@/assets/images/kid/blue-ballon.png')}
              style={{ width: 48, height: 48 }}
              contentFit="cover"
            />
          </ThemedView>
        </ThemedView>
        <ThemedView>
          {recent.watched ? (
            <ThemedView style={styles.progressRow}>
              <Image
                source={require('@/assets/images/kid/icon-check.png')}
                contentFit="cover"
                style={[styles.checkIcon, { tintColor: `${style.textColor}` }]}
              />
              <ThemedText style={[styles.storyTime, { color: style.textColor }]}>Watched</ThemedText>

              <ThemedView style={[
                styles.progressBarFilled,
                { borderColor: style.textColor, backgroundColor: style.progressColor, flex: 1 }
              ]} />
            </ThemedView>
          ) : (
            <ThemedView style={styles.progressRow}>
              <ThemedText style={[styles.storyTime, { color: style.textColor }]}>{FromSec(recent.played ?? 0)}</ThemedText>
              <ThemedView style={styles.progressBarWrap}>
                <ThemedView style={[
                  styles.progressBarFilled,
                  { borderColor: style.textColor, backgroundColor: style.progressColor, width: `${(recent.played ?? 0) * 100 / (recent.duration ?? 1)}%` }
                ]} />
                <ThemedView style={[
                  styles.progressBarOutline,
                  { borderColor: style.textColor, backgroundColor: style.bgColor, width: `${100 - (recent.played ?? 0) * 100 / (recent.duration ?? 1)}%` }
                ]} />
              </ThemedView>
              <ThemedText style={[styles.storyTime, { color: style.textColor }]}>{FromSec((recent.duration ?? 0) - (recent.played ?? 0))}</ThemedText>
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}


interface StoryCard3Props {
  storyId: string;
  seriesCategory: string,
  storyTitle: string,
  image: string,
  isFavourite: boolean,
  track: {
    duration?: number,
    played?: number,
    watched?: boolean
  }
}
export function StoryCard3({ num, story, onPlay }: { num: number, story: StoryCard3Props, onPlay?: (id: string) => void }) {
  // Use a consistent style based on the story index
  const styleIdx = num % cardStyles.length;
  const style = cardStyles[styleIdx];

  function FromSec(seconds: number): string {

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec}`;
  }

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
    <ThemedView style={[styles.storyCard, { backgroundColor: style.bgColor }]}>
      <ThemedView>
        <ThemedView style={{ height: 180 }}>
          <ThemedView style={styles.storyCardTopRow}>
            <ThemedText style={[styles.storyNumber, { color: style.textColor }]}>#{num}</ThemedText>
            <ThemedText style={[styles.storyLabel, { color: style.textColor }]}>Story</ThemedText>
            {
              <Image
                source={story.isFavourite ?
                  require('@/assets/images/kid/icon-heart.png')
                  : require('@/assets/images/kid/icon-heart.png')
                }
                style={[styles.storyFavIcon, { tintColor: `${style.textColor}` }]}
              />
            }
          </ThemedView>
          <ThemedText style={[styles.storySeries, { color: style.subTextColor }]}>{story.seriesCategory}</ThemedText>
          <ThemedText style={[styles.storyTitle, { color: style.textColor }]}>{story.storyTitle}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.storyImageWrap}>
          <Image source={story.image ? imageGen(story.image) : require('@/assets/images/kid/story-back-1.png')} style={styles.storyImage} />
          <TouchableOpacity style={styles.storyPlayBtn} onPress={() => onPlay && onPlay(story.storyId)}>
            <Image
              source={require('@/assets/images/kid/play-btn.png')}
              style={styles.storyPlayIcon}
            />
          </TouchableOpacity>
          <ThemedView style={{
            position: 'absolute',
            width: 48,
            height: 48,
            backgroundColor: style.subTextColor,
            top: -24,
            left: '50%',
            transform: 'translate(-24px, 0)',
            borderRadius: 24
          }}>
            <Image
              source={style.isBallonYellow ? require('@/assets/images/kid/yellow-ballon.png') : require('@/assets/images/kid/blue-ballon.png')}
              style={{ width: 48, height: 48 }}
              contentFit="cover"
            />
          </ThemedView>
        </ThemedView>
        {
          story.track &&
          <ThemedView>
            {story.track.watched ? (
              <ThemedView style={styles.progressRow}>
                <Image
                  source={require('@/assets/images/kid/icon-check.png')}
                  contentFit="cover"
                  style={[styles.checkIcon, { tintColor: `${style.textColor}` }]}
                />
                <ThemedText style={[styles.storyTime, { color: style.textColor }]}>Watched</ThemedText>

                <ThemedView style={[
                  styles.progressBarFilled,
                  { borderColor: style.textColor, backgroundColor: style.progressColor, flex: 1 }
                ]} />
              </ThemedView>
            ) : (
              <ThemedView style={styles.progressRow}>
                <ThemedText style={[styles.storyTime, { color: style.textColor }]}>{FromSec(story.track.played ?? 0)}</ThemedText>
                <ThemedView style={styles.progressBarWrap}>
                  <ThemedView style={[
                    styles.progressBarFilled,
                    { borderColor: style.textColor, backgroundColor: style.progressColor, width: `${(story.track.played ?? 0) * 100 / (story.track.duration ?? 1)}%` }
                  ]} />
                  <ThemedView style={[
                    styles.progressBarOutline,
                    { borderColor: style.textColor, backgroundColor: style.bgColor, width: `${100 - (story.track.played ?? 0) * 100 / (story.track.duration ?? 1)}%` }
                  ]} />
                </ThemedView>
                <ThemedText style={[styles.storyTime, { color: style.textColor }]}>{FromSec((story.track.duration ?? 0) - (story.track.played ?? 0))}</ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        }

      </ThemedView>
    </ThemedView>
  );
}
interface StoryProps1 {
  storyId: string,
  storyTitle: string,
  seriesCategory: string,
  image?: string,
  featured?: boolean,
  isFavourite?: boolean,
}

const images = [
  require('@/assets/images/kid/story-back-1.png'),
  require('@/assets/images/kid/story-back-2.png'),
  require('@/assets/images/kid/story-back-3.png')
]
export function StoryCard1({ num, story, onPlay }: { num: number, story: StoryProps1, onPlay?: (id: string) => void }) {
  // Use a consistent style based on the story index
  const [activeIndex, setActiveIndex] = React.useState(0);
  const ViewRef = useRef<View>(null);
  const styleIdx = num % cardStyles.length;
  const style = cardStyles[styleIdx];

  function FromSec(seconds: number): string {

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec}`;
  }

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
  // In your handler:
  const scrollToIndex = (idx: number) => {
    setActiveIndex(idx);
    if (ViewRef.current) {

    }
  };

  const handleLeftArrow = () => {
  };


  const handleRightArrow = () => {
  };

  const handleDotPress = (idx: Number) => {

  }

  return (
    <ThemedView style={[styles.storyCard, { backgroundColor: style.bgColor }]}>
      <ThemedView>
        <ThemedView style={{ height: 180 }}>
          <ThemedView style={styles.storyCardTopRow}>
            <ThemedText style={[styles.storyNumber, { color: style.textColor }]}>#{num}</ThemedText>
            <ThemedText style={[styles.storyLabel, { color: style.textColor }]}>Story</ThemedText>
            <TouchableOpacity>
              <Image
                source={require("@/assets/images/parent/icon-plus.png")}
                style={[styles.storyFavIcon, { tintColor: `${style.textColor}` }]}
              />
            </TouchableOpacity>
          </ThemedView>
          <ThemedText style={[styles.storySeries, { color: style.subTextColor }]}>{story.seriesCategory}</ThemedText>
          <ThemedText style={[styles.storyTitle, { color: style.textColor }]}>{story.storyTitle}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.storyImageWrap}>
          {/* Render a series of 3 background images */}
          <View
            ref={ViewRef}
            style={{ width: '100%', height: 200, overflow: 'scroll' }}>
            <ThemedView style={{ flexDirection: 'row' }}>
              {
                images.map((item, index) => (
                  <Image key={index} source={item} style={styles.storyImage} />
                ))
              }
            </ThemedView>
          </View>
          {/* <Image source={story.image ? imageGen(story.image) : imageGen("1")} style={[styles.storyImage, { position: 'relative', zIndex: 4 }]} /> */}
          <TouchableOpacity style={styles.storyPlayBtn} onPress={() => onPlay && onPlay(story.storyId)}>
            <Image
              source={require('@/assets/images/kid/play-btn.png')}
              style={styles.storyPlayIcon}
            />
          </TouchableOpacity>
          <ThemedView style={{
            position: 'absolute',
            width: 48,
            height: 48,
            backgroundColor: style.subTextColor,
            top: -24,
            left: '50%',
            transform: 'translate(-24px, 0)',
            borderRadius: 24
          }}>
            <Image
              source={style.isBallonYellow ? require('@/assets/images/kid/yellow-ballon.png') : require('@/assets/images/kid/blue-ballon.png')}
              style={{ width: 48, height: 48 }}
              contentFit="cover"
            />
          </ThemedView>
        </ThemedView>
        <ThemedView>
          <ThemedView style={[styles.progressRow, { justifyContent: 'space-around', }]}>
            {/* Dots */}
            <TouchableOpacity onPress={handleLeftArrow}>
              <Image source={require('@/assets/images/icons/arrow-left.png')} style={styles.leftBtn} />
            </TouchableOpacity>
            <ThemedView style={styles.dotsWrap}>
              {images.map((_, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleDotPress(idx)}>
                  <ThemedView
                    style={[
                      styles.dot,
                      activeIndex === idx && styles.dotActive,
                      style.bgColor == "#053B4A" && { borderColor: 'white' },
                      style.bgColor == "#053B4A" && activeIndex === idx && { backgroundColor: 'white' }
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ThemedView>
            <TouchableOpacity onPress={handleRightArrow}>
              <Image source={require('@/assets/images/icons/arrow-right.png')} style={styles.rightBtn} />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView >
  );
}


interface StoryProps2 {
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

export function StoryCard2({
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
}: StoryProps2) {
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
    <ThemedView style={[styles.storyCard2, { backgroundColor: bgColor }]}>
      <ThemedView style={styles.storyCardTopRow}>
        <ThemedText style={[styles.storyNumber, { color: textColor }]}>#{number}</ThemedText>
        <ThemedText style={[styles.storyLabel, { color: textColor }]}>Story</ThemedText>
        {
          <Image
            source={isFavorite ?
              require('@/assets/images/kid/icon-heart.png')
              : require('@/assets/images/kid/icon-heart.png')
            }
            style={[styles.storyFavIcon, { tintColor: `${textColor}` }]}
          />
        }
      </ThemedView>
      <ThemedText style={[styles.storySeries, { color: subTextColor }]}>{seriesTitle}</ThemedText>
      <ThemedText style={[styles.storyTitle2, { color: textColor }]}>{storyTitle}</ThemedText>
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
            style={[styles.checkIcon, { tintColor: `${textColor}` }]}
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


interface SeriesInterface2 {
  name: string,
  episode_count: number,
  image: string,
  isFavorite: boolean
}
export function SeriesCard2({ name, episode_count, image, isFavorite }: SeriesInterface2) {
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

      <ThemedText style={styles.seriesTitle}>{name}</ThemedText>
      <Image source={imageGen('1')} style={styles.seriesImage} />
      <ThemedText style={styles.seriesCount}>{episode_count} Stories</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Card styles for StoryCard and SeriesCard
  storyCard: {
    width: 290,
    borderRadius: 10,
    height: '100%',
    padding: 0,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderColor: '#add7da38',
    borderWidth: 1,
    marginBottom: 8,
    position: 'relative',
    display: 'flex'
  },
  storyCard2: {
    width: 290,
    borderRadius: 10,
    padding: 0,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    borderColor: '#add7da38',
    borderWidth: 1,
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
  categoryPillsContainer: {
    paddingHorizontal: 16
  },
  storyTitle: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    flexGrow: 1
  },


  storyTitle2: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 24,
    flexGrow: 1,
    marginBottom: 30
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  leftBtn: {
    width: 20,
    height: 20,
    tintColor: '#053B4A',
  },
  rightBtn: {
    width: 20,
    height: 20,
    marginBottom: 2,
    tintColor: '#053B4A',
  },
  dotsWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#053B4A',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#053B4A',
  },
});