import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ButtonIconProps {
  color: string;
  icon: string;
  onPress?: () => void;
}

export function ButtonIcon({color, icon, onPress}: ButtonIconProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{...styles.button, backgroundColor: color}}>
        <Icon name={icon} size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 70,
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
