import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import successImage from '../../assets/success.png';
import { Copyright } from '../Copyright';

interface SuccessProps {
  onFeedbackRestart: () => void;
}

export function Success({ onFeedbackRestart }: SuccessProps) {
  return (
    <View style={styles.container}>
      <Image source={successImage} style={styles.image} />

      <Text style={styles.title}>Thank you for the feedback!</Text>

      <TouchableOpacity style={styles.button} onPress={onFeedbackRestart}>
        <Text style={styles.buttonTitle}>Send another</Text>
      </TouchableOpacity>

      <Copyright />
    </View>
  );
}
