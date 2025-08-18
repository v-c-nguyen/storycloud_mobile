import { create } from 'zustand';

export interface Story {
  storyId: string;
  seriesCategory: string,
  storyTitle: string,
  image?: string,
  isFavourite?: boolean,
  track?: {
    duration?: number,
    played?: number,
    watched?: boolean
  }
}

interface StoryStoreState {
  stories: Story[];
  setStories: (stories: Story[]) => void;
  updateStory: (id: string, updates: Partial<Story>) => void;
  markWatched: (id: string) => void;
  addStory: (story: Story) => void;
  removeStory: (id: string) => void;
}

export const useStoryStore = create<StoryStoreState>((set, get) => ({
  stories: [],
  setStories: (stories) => set({ stories }),
  updateStory: (id, updates) => set(state => ({
    stories: state.stories.map(story =>
      story.storyId === id ? { ...story, ...updates } : story
    )
  })),
  markWatched: (id) => set(state => ({
    stories: state.stories.map(story =>
      story.storyId === id ? { ...story, watched: true } : story
    )
  })),
  addStory: (story) => set(state => ({
    stories: [...state.stories, story]
  })),
  removeStory: (id) => set(state => ({
    stories: state.stories.filter(story => story.storyId !== id)
  })),
}));
