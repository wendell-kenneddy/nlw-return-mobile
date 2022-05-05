import { Text, View } from 'react-native';
import { FeedbackTypes, feedbackTypes } from '../../utils/feedbackTypes';
import { Copyright } from '../Copyright';
import { Option } from '../Option';
import { styles } from './styles';

interface OptionsProps {
  onFeedbackTypeChanged: (type: FeedbackTypes) => void;
}

export function Options({ onFeedbackTypeChanged }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave your feedback</Text>

      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, val]) => (
          <Option
            key={key}
            title={val.title}
            image={val.image}
            onPress={() => onFeedbackTypeChanged(key as FeedbackTypes)}
          />
        ))}
      </View>

      <Copyright />
    </View>
  );
}
