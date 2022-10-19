import React from 'react';
import {StyleSheet, View} from 'react-native';
import PasteInput from '@mattermost/react-native-paste-input';

export default function PasteImage({onPaste}) {
  const handlePaste = (error, files) => {
    console.log('ERROR', error);
    console.log('PASTED FILES', files);
    if (!error) {
      onPaste(files[0]);
    }
  };

  return (
    <View style={styles.container}>
      <PasteInput
        placeholder="在此粘贴图片(单击或双击)"
        disableCopyPaste={false}
        onPaste={handlePaste}
        style={styles.input}
        blurOnSubmit={false}
        underlineColorAndroid="transparent"
        keyboardType="default"
        disableFullscreenUI={true}
        textContentType="none"
        autoComplete="off"
        clearTextOnFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    fontSize: 24,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
