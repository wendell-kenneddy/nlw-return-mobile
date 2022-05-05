import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator
} from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  isLoading?: boolean;
}

export function Button({ isLoading, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.text_on_brand_color} />
      ) : (
        <Text style={styles.text}>Submit Feedback</Text>
      )}
    </TouchableOpacity>
  );
}
