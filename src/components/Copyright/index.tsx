import { Text, View } from 'react-native';
import { styles } from './styles';

export function Copyright() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Made with ♥ by Wendell Kenneddy</Text>
    </View>
  );
}
