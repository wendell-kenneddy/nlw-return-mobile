import { ArrowLeft } from 'phosphor-react-native';
import { useState } from 'react';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { captureScreen } from 'react-native-view-shot';
import { api } from '../../libs/api';
import { theme } from '../../theme';
import { feedbackTypes, FeedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';
import { ScreenshotButton } from '../ScreenshotButton';
import { styles } from './styles';
7;
import * as FileSystem from 'expo-file-system';

interface FormProps {
  feedbackType: FeedbackTypes;
  onFeedbackCancel: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCancel,
  onFeedbackSent
}: FormProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [comment, setComment] = useState('');
  const { title, image } = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then((uri) => setScreenshot(uri))
      .catch((err) => console.log(err));
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleFeedbackSend() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);
    const base64Screenshot =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, {
        encoding: 'base64'
      }));

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: screenshot
          ? `data:image/png;base64, ${base64Screenshot}`
          : null
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancel}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={image} style={styles.image} />

          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Tell us what's happening..."
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button isLoading={isSendingFeedback} onPress={handleFeedbackSend} />
      </View>
    </View>
  );
}
