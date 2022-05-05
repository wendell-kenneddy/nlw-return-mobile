import { ChatTeardropDots } from 'phosphor-react-native';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { styles } from './styles';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';
import { FeedbackTypes } from '../../utils/feedbackTypes';

function WidgetBase() {
  const [feedbackType, setFeedbackType] = useState<FeedbackTypes | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleFeedbackTypeChange(type: FeedbackTypes) {
    setFeedbackType(type);
  }

  function handleFeedbackRestart() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleOpen}>
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ? (
          <Success onFeedbackRestart={handleFeedbackRestart} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCancel={handleFeedbackRestart}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options onFeedbackTypeChanged={handleFeedbackTypeChange} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}

export const Widget = gestureHandlerRootHOC(WidgetBase);
