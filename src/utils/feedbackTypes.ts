export const feedbackTypes = {
  BUG: {
    title: 'Bug',
    image: require('../assets/bug.png')
  },
  IDEA: {
    title: 'Idea',
    image: require('../assets/idea.png')
  },
  OTHER: {
    title: 'Other',
    image: require('../assets/thought.png')
  }
};

export type FeedbackTypes = keyof typeof feedbackTypes;
