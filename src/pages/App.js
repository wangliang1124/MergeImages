import React, {Component} from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import ViewShot, {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';
import PasteImage from './PasteImage';

const includeExtra = true;

export default class App extends Component {
  state = {
    selectedImages: [
      {
        fileName: '82F77EB5-50C7-4A3A-BF11-418449DAA831.jpg',
        fileSize: 226075,
        height: 2532,
        id: 'AF85F034-0335-4A04-91D8-D3D70C4E5C38/L0/001',
        timestamp: '2022-10-18T09:35:14.656+0800',
        type: 'image/jpg',
        uri: 'file:///Volumes/ExternalSSD/Library/Developer/CoreSimulator/Devices/406D7FB4-04D6-46D5-A4E1-AD5F0F7E3B5E/data/Containers/Data/Application/299EC4CF-297C-4E85-83EF-72DD0A1E7727/tmp/82F77EB5-50C7-4A3A-BF11-418449DAA831.jpg',
        width: 1170,
      },
    ],
    mergedImage: '',
  };

  viewShotRef = React.createRef();

  /**
   * This functions share a image passed using the
   * url param
   */
  shareSingleImage = async url => {
    const shareOptions = {
      title: '分享图片',
      url: url,
      failOnCancel: false,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  renderButtons = () => {
    const {selectedImages} = this.state;

    const options = {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    };

    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title={'选择图片'}
          onPress={() => {
            ImagePicker.launchImageLibrary(options, res => {
              console.log('----res--', res);
              if (res.assets?.length > 0) {
                this.setState({
                  selectedImages: [...res.assets, ...selectedImages],
                });
              }
            });
          }}
        />
        <Button
          title="分享"
          onPress={() => {
            captureRef(this.viewShotRef, {
              format: 'jpg',
              quality: 0.8,
              snapshotContentContainer: true,
            }).then(
              uri => {
                console.log('Image saved to', uri);
                this.shareSingleImage(uri);
              },
              error => console.error('Oops, snapshot failed', error),
            );
          }}
          disabled={selectedImages.length === 0}
        />
      </View>
    );
  };

  render() {
    const {selectedImages} = this.state;
    const screenWidth = Dimensions.get('window').width;
    return (
      <SafeAreaView style={{flex: 1, padding: 16}}>
        {this.renderButtons()}
        <PasteImage
          onPaste={file => {
            this.setState({
              selectedImages: [file, ...selectedImages],
            });
          }}
        />
        <ScrollView style={{flex: 1}} ref={this.viewShotRef}>
          <ViewShot style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {selectedImages.map(item => {
              return (
                <View
                  style={{
                    width: Math.floor((screenWidth - 32) / 2),
                    height: 406,
                    alignContent: 'center',
                  }}>
                  {/* <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 20,
                      top: 20,
                      zIndex: 1,
                    }}
                    onPress={() => {
                      this.setState({
                        selectedImages: selectedImages.filter(
                          img => img.uri !== item.uri,
                        ),
                      });
                    }}>
                    <Image
                      source={require('../assets/remove.png')}
                      style={{width: 40, height: 40}}
                    />
                  </TouchableOpacity> */}
                  <Image
                    source={{uri: item.uri}}
                    style={{
                      flex: 1,
                      // opacity: 0.5,
                    }}
                    resizeMode="contain"
                    key={item.uri}
                  />
                </View>
              );
            })}
          </ViewShot>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
