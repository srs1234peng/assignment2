import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#3498db',
  primaryDark: '#2980b9',
  textLight: '#ecf0f1',
  textDark: '#2c3e50',
  backgroundLight: '#ecf0f1',
  backgroundDark: '#2c3e50',
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const typography = {
  body: 16,
  heading: 24,
};

export const commonStyles = StyleSheet.create({
  container: {
    padding: spacing.medium,
  },
  label: {
    fontSize: typography.body,
    color: colors.text,
    marginBottom: spacing.small,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: spacing.medium,
    borderRadius: spacing.small,
  },
  dropdownContainer: {
    marginBottom: spacing.medium,
  },
  dropdownItem: {
    padding: spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  dropdownItemText: {
    color: colors.text,
  },
  dropdownItemsContainer: {
    maxHeight: 200,
  },
  dropdownTextInput: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: spacing.small,
    padding: spacing.small,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.medium,
  },
  checkboxLabel: {
    marginLeft: spacing.small,
    fontSize: typography.body,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
