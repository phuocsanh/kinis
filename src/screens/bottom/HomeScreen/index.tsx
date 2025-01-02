import React, {useState} from 'react';
import {Button, Pressable, Text, View} from 'components/base';
import {BottomTabScreenProps} from 'navigation/router';
import {BleManager, Device, DeviceId, Subscription} from 'react-native-ble-plx';
import {FlatList, StyleSheet} from 'react-native';

interface HomeScreenProps extends BottomTabScreenProps<'BottomHomeScreen'> {}

const bleManager = new BleManager();

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  const startScanning = () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      console.log(
        '🚀 ~ bleManager.startDeviceScan ~ scannedDevice:',
        scannedDevice,
      );
      if (error) {
        return console.warn(error);
      }
      if (scannedDevice) {
        setDevices(prevDevices => {
          return [...prevDevices, scannedDevice];
        });
      }
    });
    setTimeout(() => {
      bleManager.stopDeviceScan();
    }, 10000);
  };

  const disconnectFromDevice = (idDevice: DeviceId) => {
    bleManager
      .cancelDeviceConnection(idDevice)
      .then(device => {
        console.log(' Disconnect success: ', device);
      })
      .catch(error => {
        console.log(' Disconnect Failed: ', error);
      });
  };

  const connectToDevice = async (device: Device) => {
    try {
      await bleManager.stopDeviceScan();
      const connectedDevice = await device.connect();
      setConnectedDevice(connectedDevice);
      // await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log(`Connected to ${device.name}`);

      // Assuming we know the service and characteristic UUIDs
      // const serviceUUID = 'your-service-uuid';
      // const characteristicUUID = 'your-characteristic-uuid';

      // const subscription = connectedDevice.monitorCharacteristicForService(
      //   serviceUUID,
      //   characteristicUUID,
      //   (error, characteristic) => {
      //     if (error) {
      //       console.warn(error.message);
      //       return;
      //     }

      //     if (characteristic?.value) {
      //       const message = Buffer.from(characteristic.value, 'base64').toString('utf-8');
      //       setMessages(prevMessages => [...prevMessages, message]);
      //     }
      //   },
      // );
      // setSubscription(subscription);
    } catch (error) {
      console.warn(error);
    }
  };

  const renderItem = ({item}: {item: Device}) => (
    <Pressable style={styles.item} onPress={() => connectToDevice(item)}>
      <Text>{item.name || 'Unnamed Device'}</Text>
      <Text>{item.id}</Text>
      <Text>distance: {item.rssi ? calculateDistance(item.rssi) : 0}</Text>
    </Pressable>
  );

  return (
    <View flex safePaddingBottom safePaddingTop safeMarginTop safeMarginBottom>
      <Button onPress={startScanning} title="Scan" />
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      {connectedDevice && (
        <View style={styles.connectedDevice}>
          <Text>Connected to {connectedDevice.name || 'Unnamed Device'}</Text>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <Text>{item}</Text>}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  list: {
    marginTop: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  connectedDevice: {
    marginTop: 16,
  },
});

// Function to start scanning BLE devices
function startScanning() {
  console.log('🚀 ~ startScanning ~ startScanning:');
  // The first parameter is the UUIDs of services (null if you want to scan all devices)
  // Second parameter - scanning options
  // The third parameter is a callback called when a device is detected
  bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
    console.log(
      '🚀 ~ bleManager.startDeviceScan ~ scannedDevice:',
      scannedDevice,
    );
    // if (error) {
    //   console.warn(error);
    //   return;
    // }
    // if (scannedDevice && scannedDevice.name === 'quan') {
    //   console.log(scannedDevice.name, scannedDevice.rssi);
    //   const distance = calculateDistance(scannedDevice.rssi);
    //   console.log('🚀 ~ bleManager.startDeviceScan ~ distance:', distance);
    // const averageRssi = addRssiValueAndGetAverage(scannedDevice.id, scannedDevice.rssi);
    //   // console.log(`Average RSSI value for device ${scannedDevice.name}: ${averageRssi}`);
    // }
  });
}
// Stop scanning if necessary
// function stopScanning() {
//   bleManager.stopDeviceScan();
// }

function calculateDistance(rssi: number, measure = -69, multiplier = 2) {
  return Math.pow(10, (measure - rssi) / (10 * multiplier));
}

// function addRssiValueAndGetAverage(deviceId: Device['id'], newValue: Device['rssi'], maxSize = 3) {
//   if (!rssiValues[deviceId]) {
//     rssiValues[deviceId] = []; // Initialize the array if this is the first value
//   }
//   const values = rssiValues[deviceId];
//   values.push(newValue); // Add a new value

//   // Remove the oldest value if the maximum array size is exceeded
//   if (values.length > maxSize) {
//     values.shift();
//   }

//   // Calculate the average value
//   const averageRssi = values.reduce((acc, value) => acc + value, 0) / values.length;
//   return averageRssi;
// }
